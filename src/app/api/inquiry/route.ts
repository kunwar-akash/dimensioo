import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { inquiryConfig } from '../../../inquiry-config'

const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const failure = (error: string, status: number) => NextResponse.json({ error }, { status })
const contactFields = ['name', 'company', 'email', 'phone', 'category', 'service', 'budget', 'message']
const creatorFields = ['name', 'email', 'phone', 'instagram', 'youtube', 'other', 'category', 'location', 'audience', 'message', 'extra']
const contactCategories = ['Brand partnerships', 'Marketing services', 'Influencer campaigns', 'Creator management', 'General inquiries']

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) return failure('Send the form as JSON.', 415)
  const origin = request.headers.get('origin')
  const canonical = process.env.NEXT_PUBLIC_SITE_URL
  const allowed = [new URL(request.url).origin, ...(canonical ? [new URL(canonical).origin] : [])]
  if (origin && !allowed.includes(origin)) {
    try {
      const source = new URL(origin)
      const host = request.headers.get('host')
      if (!['http:', 'https:'].includes(source.protocol) || source.host !== host) throw new Error()
    } catch {
      return failure('This form request was rejected.', 403)
    }
  }

  const reader = request.body?.getReader()
  if (!reader) return failure('Missing form data.', 400)
  const chunks: Uint8Array[] = []
  let size = 0
  let data: Record<string, unknown>
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 32_768) {
        await reader.cancel()
        return failure('The submission is too large.', 413)
      }
      chunks.push(value)
    }
    data = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error()
  } catch {
    return failure('The form data could not be read.', 400)
  }

  if (data.website) return failure('This form request was rejected.', 400)
  if (data.type !== 'creator' && data.type !== 'contact') return failure('Choose a valid form.', 400)
  const creator = data.type === 'creator'
  const fields = creator ? creatorFields : contactFields
  const values = Object.fromEntries(fields.map(key => [key, typeof data[key] === 'string' ? data[key].trim() : '']))
  if (!values.name || !email.test(values.email) || !values.category || !values.message || data.consent !== 'on') {
    return failure('Complete the required fields and confirm privacy consent.', 422)
  }
  if (!creator && !contactCategories.includes(values.category)) return failure('Choose a valid inquiry type.', 422)
  for (const key of fields) {
    const limit = key === 'message' ? 4000 : key === 'extra' ? 2000 : key === 'email' ? 254 : 300
    if (values[key].length > limit) return failure('A field exceeds its character limit.', 422)
  }
  for (const key of ['instagram', 'youtube', 'other']) {
    if (!values[key]) continue
    try {
      if (!['http:', 'https:'].includes(new URL(values[key]).protocol)) throw new Error()
    } catch {
      return failure('Social links must be valid web URLs.', 422)
    }
  }
  const config = inquiryConfig()
  if (!config) return failure('Online submissions are currently unavailable.', 503)

  const subject = creator ? 'New Dimensioo creator application' : 'New Dimensioo business inquiry'
  const signal = AbortSignal.timeout(8000)
  try {
    if (config.provider === 'web3forms') {
      const sent = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          access_key: config.accessKey,
          subject,
          from_name: 'Dimensioo website',
          replyto: values.email,
        }),
        signal,
      })
      if (sent.status === 429) return failure('The inbox is busy. Please try again shortly.', 429)
      if (!sent.ok || (await sent.json()).success !== true) {
        return failure('We couldn’t send your message. Please try again.', 502)
      }
      return NextResponse.json({ delivered: true })
    }

    const text = fields.filter(key => values[key]).map(key => `${key}: ${values[key]}`).join('\n\n')
    const idempotencyKey = createHash('sha256').update(JSON.stringify([creator, values])).digest('hex')
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify({ from: config.from, to: [config.to], reply_to: values.email, subject, text }),
      signal,
    })
    if (!sent.ok) {
      if (sent.status === 429) return failure('The inbox is busy. Please try again shortly.', 429)
      return failure('We couldn’t send your message. Please try again.', 502)
    }
    const receipt = await sent.json()
    if (typeof receipt.id !== 'string' || !receipt.id) return failure('We couldn’t confirm your message. Please try again.', 502)
    return NextResponse.json({ delivered: true })
  } catch {
    return failure('We couldn’t send your message. Please try again.', 502)
  }
}
