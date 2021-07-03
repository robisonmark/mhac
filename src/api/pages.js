import { content } from './base'

/***
  * This file creates the base api for pages.
***/
class Pages {
  constructor () {
    const base = content

    base.interceptors.response.use(this.handleSuccess, this.handleError)
    this.pages = base
  }

  handleSuccess (response) {
    return response.data
  }

  handleError (err) {
    return err
  }

  async get (slug) {
    return this.pages({
      url: `/pages/${slug}/`,
      method: 'GET'
    })
  }
}

export default new Pages()
