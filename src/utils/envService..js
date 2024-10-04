import { supportedEnvironments } from './constants.js'

/**
 * Gets the value of an environment variable. Returns undefined if not found
 * @param variableName
 */
export const getEnvVariable = (variableName) => {
  return process.env[variableName]
}

/**
 * Find the environment in which the application is running
 * @returns value of NODE_ENV or throws error if unknown/not-found
 */
export const getEnvironment = () => {
  const environment = getEnvVariable('NODE_ENV')

  if (!supportedEnvironments.includes(environment)) {
    throw new Error(`Unsupported environment value: ${environment}`)
  }

  return environment
}
