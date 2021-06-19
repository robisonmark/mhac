import { Auth } from 'aws-amplify'

class AuthToken {
  async setAuth (requestObj) {
    let token = ''
    await Auth.currentSession().then(response => {
      token = response.idToken.jwtToken
    })
    requestObj.defaults.headers.common.Authorization = 'Bearer ' + token

    return requestObj
  }
}

export default new AuthToken()
