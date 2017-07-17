const { first } = require('./utils/array')
const { capitalCase } = require('./utils/string')

function createAiApi (intentIs) {
  return function (response) {
    const intents = reduceIntentPath(response)
    const name = first(Object.keys(intents))
    const types = intents[name]
    return Object.keys(types)
    .reduce((api, type) => {
      api[type] = Object.keys(types[type])
      .reduce((acc, action) => {
        acc[action] = types[type][action].name
        acc['is' + capitalCase(action)] = intentIs(acc[action])
        return acc
      }, {})
      return api
    }, {})
  }
}

function reduceIntentPath (res) {
  return res.reduce((acc, c) => {
    c.name.split('.')
    .reduce((decend, key, i, arr) => {
      if (arr.length - 1 === i) decend[key] = c
      if (!decend[key]) decend[key] = {}
      return decend[key]
    }, acc)

    return acc
  }, {})
}


module.exports = createAiApi
