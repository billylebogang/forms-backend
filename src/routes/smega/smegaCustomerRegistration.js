import express from 'express'
import { createSmegaCustomerSchema } from '../../utils/validationSchemas/smegaMinorSchema.js'
import {
  addNewSmegaCustomerRegistration,
  getAllSmegaCustomers,
} from '../../utils/database/dbServices.registerSmega.js'

const SmegaRegistrationRouter = express.Router()

const getSmegaMinor = (req, res, next) => {
  return res.send('getting smega minor customer ' + req.params.msisdn)
}

const getSmegaCustomers = (req, res, next) => {
  //validation

  //authorisation

  //operation
  getAllSmegaCustomers()
    .then((result) => {
      console.info(result)
      return res
        .status(201)
        .json({ message: 'Get Smega customers successful', result })
    })
    .catch((error) => {
      console.error(error)
      return res
        .status(500)
        .json({ error: 'Get Smega customers failed', message: error.message })
    })
}

const postSmegaCustomer = async (req, res) => {
  //validation
  try {
    await createSmegaCustomerSchema.validate(req.body)
  } catch (error) {
    // Code to handle the error
    console.error(error)
    return res.status(500).json({
      error: 'Error creating SmegaCustomer',
      errorMessage: error.message,
    })
  }

  //authorisation

  addNewSmegaCustomerRegistration(req.body)
    .then((result) => {
      res.status(201).json({ message: 'Registration successful', result })
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: 'Registration failed', errorMessage: error.message })
    })
}

const patchSmegaMinor = (res, req, next) => {
  return res.send('patching smega minor customer')
}

SmegaRegistrationRouter.get('/smega/:msisdn', getSmegaMinor)
  .get('/smega/', getSmegaCustomers)
  .post('/smega/1001', postSmegaCustomer)
  .patch('/smega/1001', patchSmegaMinor)

export default SmegaRegistrationRouter
