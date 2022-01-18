import Commerce from '@chec/commerce.js'

// boolean is to decide whether creating the Ecommerce store:
// this commerce instance replaces the whole backend API
export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true,
)
