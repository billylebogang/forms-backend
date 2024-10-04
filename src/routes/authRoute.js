import express from 'express'
const authRoute = express.Router()
import axios from 'axios'
import qs from 'qs'

authRoute.post('/login', (req, res) => {
  const receivedData = req.body

  console.log('Authenticating for username: ', receivedData.username)

  let data = qs.stringify({
    client_id: 'btc-ad_client',
    username: receivedData.username + '@btc.bw',
    password: receivedData.password,
    grant_type: 'password',
    //'client_secret': 'qiTExR4bFLOsSqQMnoZfqjuLgz9Wlud',
    client_secret: 'kgJAQuPkZ94JteTEbK8lh3cS2lIuUqOY',
    scope: 'openid',
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://keycloak-sso-system.services.btc.bw/auth/realms/btc_staff/protocol/openid-connect/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie:
        '3ef88a617efab92ffb28f2972e7d264d=3116d0288108030526d49a737795199f',
    },
    data: data,
  }

  axios
    .request(config)
    .then((response) => {
      console.log(response.data)
      //console.log(JSON.stringify(response.data));

      return res.json(response.data).status(201)
    })
    .catch((error) => {
      // console.log(error);
      return res
        .json({ statusCode: error.status, message: error.message })
        .status(400)
    })
})

export default authRoute
