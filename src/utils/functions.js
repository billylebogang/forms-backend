import { exemptedPaths } from './constants.js'

export const generateRandomReferenceNumber = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

export const isPathExempted = (requestMethod, path) => {
  // remove trailing '/' if present
  path = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
  // check if specially exempted in development// check the paths exempted in all environment
  return (exemptedPaths[requestMethod] || []).some((x) => x === path)
}
