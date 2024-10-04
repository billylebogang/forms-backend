import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
const app = express()
import SmegaMinorRegistrationRouter from './routes/smega/smegaCustomerRegistration.js'
import authRoute from './routes/authRoute.js'
import ServicePointRoute from './routes/servicesPoint/servicePointRoute.js'
import { validateUserToken } from './middleware/auth.middleware.js'
import {logInfo} from "./utils/logger.js";

dotenv.config()
app.use(express.json()) // Parse JSON request bodies
app.use(cors({origin: ['*']}))
app.use(validateUserToken)

//test route
app.get('/api/v1', (req, res) => {

    logInfo(`User ${req.headers.user} requested the test endpoint`)
  res.json({ message: 'Exsee! I am v1 forms api' }).status(200)
})

//routes
app.use('/api/v1/', SmegaMinorRegistrationRouter)
app.use('/api/v1/', authRoute)
app.use('/api/v1/', ServicePointRoute)

const port = process.env.PORT || 3000
if (!port) throw new Error('Port is required')
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
