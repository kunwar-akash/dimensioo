export function inquiryConfig() {
  const { WEB3FORMS_ACCESS_KEY, RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL } = process.env
  if (WEB3FORMS_ACCESS_KEY?.trim()) return { provider: 'web3forms' as const, accessKey: WEB3FORMS_ACCESS_KEY.trim() }
  if (RESEND_API_KEY && INQUIRY_FROM_EMAIL && INQUIRY_TO_EMAIL) {
    return { provider: 'resend' as const, apiKey: RESEND_API_KEY, from: INQUIRY_FROM_EMAIL, to: INQUIRY_TO_EMAIL }
  }
}
export function inquiryAvailable() {
  return Boolean(inquiryConfig())
}
