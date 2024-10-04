import { getEnvVariable } from '../utils/envService..js'
import { isPathExempted } from '../utils/functions.js'
import { jwtDecode } from 'jwt-decode'
import {logError, logInfo} from "../utils/logger.js";

/**
 * Middleware to authenticate a requesting frontend
 * applications auth-token
 * @returns Response from failed verification or calls next function
 */
export const validateUserToken = async (req, res, next) => {
    console.info('authenticating...')
 // const isEnabled = getEnvVariable('AUTH_USER')
  const isEnabled= false

  if (!isEnabled){
    console.info('authentication disabled')
    return next()
  }

  if (isPathExempted(req.method, req.path)) return next()

    logInfo('Checking for access token')

  const accessTokenPayload = req.headers.accesstoken
  if (!accessTokenPayload) {
    return res.status(401).send('Unauthorized, missing access token.')
  }

  logInfo(`Verifying access token ...`)

  console.log(accessTokenPayload)

  try {
    const decodedAccessToken = jwtDecode(accessTokenPayload)
    const roles = decodedAccessToken.resource_access.forms_client
      const email = decodedAccessToken.email


    if (!roles) {
      return res.status(401).send('Unauthorized, missing roles')
    }

    req.headers.roles = roles
      req.headers.user = email


    return next()
  } catch (error) {
    logError('Error decoding token:', error)
    return res.status(401).send('Unauthorized, failed to verify access token.')
  }
}
