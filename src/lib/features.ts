export const FEATURES = {
  courses: process.env.NEXT_PUBLIC_FEATURES_COURSES === 'true',
  // Email sign-up + /free-gift: on everywhere unless switched off (live build sets false until Orla's ready)
  signup: process.env.NEXT_PUBLIC_FEATURES_SIGNUP !== 'false',
}
