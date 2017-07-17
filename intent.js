const request = require('request')
const uuid = require('./utils/uuid')
const promisify = require('./utils/promisify')
const createAiApi = require('./api')
const { API_AI_URL, API_AI_VERSION } = require('./constants')

function allIntents (dev_key, client_key) {
  return promisify(function (cb) {
    request(API_AI_URL + 'intents', {
      method: 'GET',
      headers: aiHeader(dev_key),
      qs: aiQuery()
    }, cb)
  })
  .then(createAiApi(function intentIs (action) {
    return function (text, userId, lang) {
      return findIntent(client_key, text, userId, lang)
      .then(intent => intent.action === action)
    }
  }))
}

function findIntent (client_key, query, sessionId, lang='en') {
  return promisify(function (cb) {
    sessionId = sessionId || uuid()
    request(API_AI_URL + 'query', {
      method: 'GET',
      headers: aiHeader(client_key),
      qs: aiQuery({
        query: query,
        sessionId: sessionId,
        lang: lang
      })
    }, cb)
  })
  .then(res => res.result)
}

function aiQuery (query) {
  return Object.assign({
    v: API_AI_VERSION
  }, query || {})
}

function aiHeader (key) {
  return {
    'Authorization': 'Bearer ' + key
  }
}

module.exports = {
  allIntents,
  findIntent
}
