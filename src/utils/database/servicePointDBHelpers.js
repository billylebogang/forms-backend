import sql from './db.js'
import { generateRandomReferenceNumber } from '../functions.js'

async function getShops() {
  const users = await sql`

        SELECT *
        FROM forms.shops;
`
  return users
}

export async function getVisits(shopId) {
  const shopVisits = await sql`
        SELECT *
        FROM forms.shop_visits
        WHERE shop=${shopId}
    `
  return shopVisits
}

export async function getOpenVisits(shopId) {
  const shopVisits = await sql`
        SELECT *
        FROM forms.shop_visits
        WHERE shop=${shopId} and status='open'
    `
  return shopVisits
}

export async function captureVisits(visitDataObject) {
  const {
    aclPaymentSME,
    billPayment,
    configurationServices,
    customerEducation,
    customerEmail,
    customerName,
    customerPhone,
    customerType,
    dealers,
    gadgetsPurchase,
    queryLoggingAdjustment,
    refunds,
    servicesRequest,
    simCashIn,
    simCashOut,
    simRegistration,
    simReplacement,
    smegaCardPinReset,
    smegaCardReplacement,
    smegaRegistration,
    troubleshooting,
    createdBy,
    createdOn,
    shopId,
    notes,
  } = visitDataObject

  const ref = generateRandomReferenceNumber(6)

  // const createdOn = new Date()

  console.log('time on the save button', new Date())
  console.log('createdOn', createdOn)

  const now = new Date()
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'Africa/Gaborone',
    hour12: false, // Set to true for 12-hour format, false for 24-hour format
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(now)

  console.log(formattedDate)

  const shopVisitsRef = await sql`
        INSERT INTO forms.shop_visits (id, customer_email, customer_type, customer_name, customer_phone, created_by, created_on, shop, status, notes, serviced_by, serviced_on, bill_payment, "configurationServices", "customerEducationn", "gadgetsPurchase", "queryLoggingAdjustment", refunds, "servicesRequest", "simRegistration", "smegaCashIn", "SmegaCashOut", "simReplacement", "SmegaCardPinReset", "smegaCardReplacement", "smegaRegistration", troubleshooting, "aclPaymentSME", dealers)
        VALUES (${ref},${customerEmail}, ${parseInt(customerType)} , ${customerName},${customerPhone}, ${createdBy}, ${formattedDate}, ${parseInt(shopId)}, 'open', ${notes}, null, null, ${billPayment}, ${configurationServices}, ${customerEducation}, ${gadgetsPurchase}, ${queryLoggingAdjustment}, ${refunds}, ${servicesRequest}, ${simRegistration}, ${simCashIn}, ${simCashOut}, ${simReplacement}, ${smegaCardPinReset}, ${smegaCardReplacement}, ${smegaRegistration}, ${troubleshooting}, ${aclPaymentSME}, ${dealers})
         returning id
    `
  return shopVisitsRef
}

export async function updateVisits(updateVisit) {
  const { servicedBy, recordRef, note } = updateVisit

  const servicedOn = new Date()

  const shopVisits = await sql`

        UPDATE forms.shop_visits
        SET status='closed', serviced_by=${servicedBy}, serviced_on= ${servicedOn}, notes=${note}
        WHERE id = ${recordRef}
        returning id
    `
  return shopVisits
}

export default getShops
