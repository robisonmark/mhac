/***
  * This file creates the base api endpoint.
  * It takes the endpoint for the proper .env.js and creates the base url.
  * Then it intercepts the request to remove the body body from the payload if present.
  * Lastly it intercepts the response in hopes of catching auth errors earlier
***/

import axios from 'axios'
// import _ from 'lodash'

export let robros = axios.create({
  'baseURL': process.env.API_ENDPOINT,
  'withCredentials': false
})

/* ********************************* *\
     Code Below is to mimic the
     response from AWS Amplify so
     that we don't have to rewrite
     responses:
\* ********************************* */

/***
 * This grabs the request and
 * deletes 'body' if present
 *  when passing request as data
 * @param request
 * @returns request
***/

// promo.interceptors.request.use(request => {
//   let data
//   if (_.has(request.data, 'body')) {
//     // console.log('body: ', request.data.body)
//     data = request.data.body
//     request.data = data
//   }
//   return request
// }, error => {
//   // console.log(error.config)
//   return Promise.reject(error.response)
// })

/***
 * This grabs the response and
 * deletes all headers then
 * attaches just the data
 *
 * If there is a token error
 * it grabs the error and prompts
 * for a page refresh
 * @param response
 * @returns response
***/
// promo.interceptors.response.use(response => {
//   // console.log('response', response)
//   let data = response.data
//   // delete response.config
//   // delete response.headers
//   // delete response.request
//   // delete response.status
//   // delete response.statusText
//   return data
// }, error => {
//   if (error.message === 'The incoming token has expired') {
//     alert('Your Session has expired please refresh your window.')
//   }
//   // console.log('error: ', error.response)
//   return Promise.reject(error.response)
// })
