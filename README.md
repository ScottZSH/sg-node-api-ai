# API AI Node Interface

[![Travis](https://img.shields.io/travis/rphansen91/node-api-ai.svg?style=flat-square)](https://travis-ci.org/rphansen91/node-api-ai)
[![Code Coverage](https://img.shields.io/codecov/c/github/rphansen91/node-api-ai/master.svg?style=flat-square)](https://codecov.io/github/rphansen91/node-api-ai)
[![Version](https://img.shields.io/npm/v/node-api-ai.svg?style=flat-square)](https://www.npmjs.com/package/node-api-ai)
[![Downloads](https://img.shields.io/npm/dm/node-api-ai.svg?style=flat-square)](http://npm-stat.com/charts.html?package=node-api-ai&from=2016-08-01)
[![ISC License](https://img.shields.io/npm/l/node-api-ai.svg?style=flat-square)](http://opensource.org/licenses/ISC)

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Dependencies](#dependencies)

## Description

* Simple API for interacting with API AI
* Follows the intent naming convention supplied from [api.ai](http://api.ai) and provides method to check if text is of a specific intent.

## Installation

```
npm install node-api-ai --save
```

## Usage

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

## Dependencies

* [prettyjson](https://github.com/rafeca/prettyjson)
* [uuid](https://github.com/kelektiv/node-uuid)

