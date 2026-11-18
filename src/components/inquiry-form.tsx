'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import Link from 'next/link'
import { services } from '../content'

export function InquiryForm({ creator, available }: { creator?: boolean; available: boolean }) {
  const [status, setStatus] = useState({ state: '', message: '' })
  const confirmation = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status.state === 'success') confirmation.current?.scrollIntoView({ block: 'nearest' })
  }, [status.state])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!available || status.state === 'pending') return
    const form = event.currentTarget
    setStatus({ state: 'pending', message: 'Sending…' })
    try {
      const data = Object.fromEntries(new FormData(form))
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, type: creator ? 'creator' : 'contact' }) })
      const result = await response.json()
      if (!response.ok || result?.delivered !== true) {
        throw new Error(result?.error || 'Unable to confirm your submission. Please try again.')
      }
      form.reset()
      setStatus({ state: 'success', message: '' })
    } catch (error) {
      setStatus({ state: 'error', message: error instanceof Error ? error.message : 'Unable to send. Please try again.' })
    }
  }
  return <form onSubmit={submit} className="inquiry">
    <div className="form-grid">
      <Field name="name" label="Full name" required autoComplete="name" />
      {!creator && <Field name="company" label="Company name" autoComplete="organization" />}
      <Field name="email" label="Email address" type="email" required autoComplete="email" />
      <Field name="phone" label="Phone number" type="tel" autoComplete="tel" />
      {creator ? <>
        <Field name="instagram" label="Instagram profile URL" type="url" />
        <Field name="youtube" label="YouTube profile URL" type="url" />
        <Field name="other" label="Other profile URL" type="url" />
        <Field name="category" label="Primary content category" required />
        <Field name="location" label="Location" autoComplete="address-level2" />
        <Field name="audience" label="Approximate audience size" />
      </> : <>
        <label>Inquiry type<select name="category" required defaultValue=""><option value="" disabled>Select inquiry type</option>{['Brand partnerships', 'Marketing services', 'Influencer campaigns', 'Creator management', 'General inquiries'].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Service interested in<select name="service" defaultValue=""><option value="">Select a service</option>{services.map(service => <option key={service.slug}>{service.name}</option>)}<option>Not sure yet</option></select></label>
        <Field name="budget" label="Estimated budget (optional)" />
      </>}
    </div>
    <label>{creator ? 'Short introduction' : 'Project description'}<textarea name="message" rows={5} required maxLength={4000} /></label>
    {creator && <label>Additional message<textarea name="extra" rows={3} maxLength={2000} /></label>}
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="consent"><input type="checkbox" name="consent" id="privacy-consent" required /><label htmlFor="privacy-consent">I agree to the <Link href="/privacy-policy">privacy policy</Link> and consent to being contacted about this submission.</label></div>
    {!available && <p className="form-note">Online submissions are unavailable until Dimensioo connects its inquiry inbox.</p>}
    <button className="button primary" disabled={!available || status.state === 'pending'}>{status.state === 'pending' ? 'Sending…' : creator ? 'Send application' : 'Send inquiry'} <ArrowUpRight size={17} /></button>
    <div className="form-feedback" role="status" aria-atomic="true">
      {status.state === 'pending' && <p className="form-status">{status.message}</p>}
      {status.state === 'success' && (
        <div className="form-success" ref={confirmation}>
          <span className="form-success-icon" aria-hidden="true"><Check size={21} strokeWidth={2.5} /></span>
          <div>
            <strong>{creator ? 'Application sent' : 'Inquiry sent'}</strong>
            <p>Thanks for reaching out to Dimensioo.</p>
          </div>
        </div>
      )}
    </div>
    {status.state === 'error' && <p className="form-status" role="alert">{status.message}</p>}
  </form>
}

function Field({ name, label, type = 'text', required, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label>{label}<input name={name} type={type} required={required} maxLength={name === 'email' ? 254 : 300} autoComplete={autoComplete} /></label>
}
