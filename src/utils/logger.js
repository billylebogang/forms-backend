import winston from 'winston'

const logger1 = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'forms_logs.log' })
    ]
});


const logger = winston.createLogger({
  format: winston.format.combine(),
  defaultMeta: {
    applicationName: 'Forms Server',
  },
  transports: [new winston.transports.Console()],
})

export const logInfo = (message, props = {}) => {
  logger.info(message, addCorrelationId(props))
}

export const logWarning = (message, props = {}) => {
  logger.warn(message, addCorrelationId(props))
}

export const logError = (message, error, props ={}) => {
  logger.error(message, addCorrelationId({ err: error, ...props }))
}

const addCorrelationId = (props) => {
  return {
    correlationId: 1233445,
    ...props,
  }
}
