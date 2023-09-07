import axios from 'axios'

// [WIP] see about extending the same class -> probably not needed
// class Axios {
//   constructor () {
//     return axios.create()
//   }
// }

// class Content extends Axios {
//   robros () {
//     super.baseURL = import.meta.env.VITE_APP_API_ENDPOINT
//   }

//   content () {
//     super.baseURL = import.meta.env.VITE_APP_CONTENT_API
//   }
// }

/**
  * Connects to the public-facing content that is
  * curated and edited in the the admin suite created
  * through wagtail.
*/
// export const content = Content

export const robros = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT
  // withCredentials: false,
  // headers: {
  //   'Content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  // }
})

/**
 * Connects to the public-facing content that is
 * curated and edited in the the admin suite created
 * through wagtail.
 */
export const content = axios.create({
  baseURL: import.meta.env.VITE_APP_CONTENT_API
  // commented out because of CORS
  // withCredentials: false,
  // headers: {
  //   'Content-type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  // }
})
