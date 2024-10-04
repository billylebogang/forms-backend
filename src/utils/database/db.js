import postgres from 'postgres'

const sql = postgres({
  user: 'btc_forms_user',
  host: '10.1.31.251',
  database: 'btc_forms',
  password: 'Gun$[]09!%Howl!tz3r',
  port: 5432,
})

export default sql
