const prettyjson = require('prettyjson')
const { allIntents, findIntent } = require('./intent')
const { INVALID_KEYS } = require('./errors')

class AIEntity {

  constructor ({ dev_key, client_key, logging }={}) {
    if (!dev_key || !client_key) {
      throw new Error(INVALID_KEYS)
    }

    this.dev_key = dev_key
    this.client_key = client_key
    this.logging = logging

    this.initialized = allIntents(dev_key, client_key)
    .then(intents => this._setIntents(intents))
  }

  findIntent (text) {
    return this.initialized
    .then(() => {
      return findIntent(this.client_key, text)
    })
  }

  _setIntents (intents) {
    Object.assign(this, intents)
    this._logIntents(intents)
    return this
  }

  _logIntents (intents) {
    this.logging && console.log(prettyjson.render(intents))
  }
}

module.exports = AIEntity
