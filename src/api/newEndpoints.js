import { robros } from './base'

class RoBrosApi {
    constructor () {
      const base = robros
  
      base.interceptors.response.use(this.handleSuccess, this.handleError)
      this.admin = base
    }

    handleSuccess (response) {
        // commented out because this controls all robros calls (base calls)
        // return response.data // uncomment to only pass data as the response, not the response signature
        return response
      }
    
      handleError (err) {
        console.err( "NEwEndpoint", err)
        return err
      }
    
    async sendRoster (body, teamId, year) {
        return robros({
          url: '/teamFile/' + teamId + "/"+ year,
          method: 'POST',
          data: body
        })
      }
    }
  
export default new RoBrosApi()