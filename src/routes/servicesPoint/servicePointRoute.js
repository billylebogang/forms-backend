import express from 'express'
import getShops, {
  captureVisits,
  getOpenVisits,
  getVisits,
  updateVisits,
} from '../../utils/database/servicePointDBHelpers.js'
const ServicePointRoute = express.Router()

const getShopList = async (req, res) => {
  try {
    const result = await getShops()
    console.log(result)
    return res.status(201).json({ message: 'Get shops successful', result })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Get shops failed', errorMessage: error.message })
  }
}

const getVisitList = async (req, res) => {
  const shopId = req.params.shopId
  console.log(shopId)
  try {
    const result = await getVisits(shopId)
    console.log(result)
    return res.status(201).json({ message: 'Get visits successful', result })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Get visits failed', errorMessage: error.message })
  }
}

const getOpenVisitList = async (req, res) => {
  const shopId = req.params.shopId
  console.log(shopId)
  try {
    const result = await getOpenVisits(shopId)
    console.log(result)
    return res
      .status(201)
      .json({ message: 'Get visit successful', result })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Get failed', errorMessage: error.message })
  }
}

const captureVisit = async (req, res) => {
  const visitBody = req.body

  console.log(visitBody)

  try {
    const result = await captureVisits(visitBody)
    // console.log(result)
    return res.status(201).json({ message: 'Visit saved', result })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Visit failed', errorMessage: error.message })
  }
}

const putVisit = async (req, res) => {
  const visitBody = req.body

  console.log(visitBody)

  try {
    const result = await updateVisits(visitBody)
    console.log(result)
    return res.status(201).json({ message: 'Visit saved', result })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Visit failed', errorMessage: error.message })
  }
}

ServicePointRoute.get('/shops', getShopList)
  .get('/visit/open/:shopId', getOpenVisitList)
  .get('/visit/:shopId', getVisitList)
  .post('/visit', captureVisit)
  .put('/visit', putVisit)

export default ServicePointRoute
