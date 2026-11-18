export function inquiryConfig() {
  const { RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL } = process.env
  return { apiKey: RESEND_API_KEY, from: INQUIRY_FROM_EMAIL, to: INQUIRY_TO_EMAIL }
}
export function inquiryAvailable() {
  const { apiKey, from, to } = inquiryConfig()
  return Boolean(apiKey && from && to)
}
