import postgres from 'postgres'
import { generateRandomReferenceNumber } from '../functions.js'
import sql from './db.js'

export const getAllSmegaCustomers = async () => {
  const smegaCustomers = await sql`
    SELECT
      *
    FROM forms.smega_customer_registration_form
  `
  return smegaCustomers
}

export const addNewSmegaCustomerRegistration = async (newSmegaCustomer) => {
  const {
    operation_type,
    firstnames,
    lastname,
    date_of_birth,
    country_of_birth,
    gender,
    id_type,
    id_number,
    id_valid_until,
    occupation,
    profession,
    physical_address,
    postal_address,
    btc_number,
    other_contact,
    email,
    next_of_kin,
    nok_relationship,
    nok_contact,
    created_on,
    agent_name,
    agent_email,
    serviced_on,
  } = newSmegaCustomer

  const recordReference = generateRandomReferenceNumber(8)

  const newCustomer = await sql`
        INSERT INTO forms.smega_customers
            (id, record_ref, operation_type, firstnames, lastname, date_of_birth, country_of_birthh, gender, id_type, id_number, id_valid_until, occupation, profession, physical_addresss, postal_address, btc_number, other_contact, email, next_of_kin, nok_relationship, nok_contact, created_on, agent_name, agent_email, serviced_on)
        VALUES
            (${id_number}, ${recordReference}, ${operation_type}, ${firstnames}, ${lastname}, ${date_of_birth}, ${country_of_birth}, ${gender}, ${id_type}, ${id_number}, ${id_valid_until}, ${occupation}, ${profession}, ${physical_address}, ${postal_address}, ${btc_number}, ${other_contact}, ${email}, ${next_of_kin}, ${nok_relationship}, ${nok_contact}, ${created_on}, ${agent_name}, ${agent_email}, ${serviced_on})
            returning record_ref;
    `
  return newCustomer
}
