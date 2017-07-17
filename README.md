# API AI Node Interface

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)

# Description

* Simple API for interacting with API AI
* Follows the intent naming convention supplied from [api.ai](http://api.ai) and provides method to check if text is of a specific intent.

# Installation

* $ npm install node-api-ai

## usage

```js
const AIEntity = require('node-api-ai')
const entity = AIEntity({
  dev_key: '<developer access token>',
  client_key: '<client access token>',
  logging: false // optional
})

// IS SINGLE INTENT
entity.initialized
.then(function () {
  return entity.confirmation.isYes('<some text query>') //
})
.then(function (result) {
  result // Boolean
})

// IS MULTIPLE INTENT
entity.findIntent('<some text query>')
.then(function (result) {
  const action = result.action
  return [
    action === entity.confirmation.yes,
    action === entity.confirmation.no
    ...
  ]
})

```

