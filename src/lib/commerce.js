import Commerce from '@chec/commerce.js'

// Create an instance of the commerce.js libraries store
export const commerce = new Commerce(process.env.REACT_APP_CHEC_KEY, true)