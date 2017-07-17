/*global describe test expect*/
const AIEntity = require('./index')
const MOCK_KEYS = require('./mock.json')
const { INVALID_KEYS } = require('./errors')

console.log(process.env)
const REAL_KEYS = process.env.REAL_DEV_KEY ? {
  dev_key: process.env.REAL_DEV_KEY,
  client_key: process.env.REAL_CLIENT_KEY
} : require('./real.json')
console.log(REAL_KEYS)

describe('AI Entity API', () => {
  test('Should throw error if misconfigured', () => {
    return expect(() => new AIEntity())
    .toThrowError(INVALID_KEYS)
  })

  test('Should create an Entity API object', () => {
    return expect(() => new AIEntity(MOCK_KEYS) instanceof AIEntity)
    .toBeTruthy()
  })

  test('Should create an initialized Promise', () => {
    return expect(() => new AIEntity(MOCK_KEYS).initialized instanceof Promise)
    .toBeTruthy()
  })

  test('Should have a findIntent method', () => {
    return expect(typeof new AIEntity(MOCK_KEYS).findIntent)
    .toBe('function')
  })

  test('Should reject if invalid developer keys', () => {
    return expect(new AIEntity(MOCK_KEYS).initialized)
    .rejects.toContain(MOCK_KEYS.dev_key)
  })

  test('Should reject if invalid client keys', () => {
    return expect(new AIEntity(MOCK_KEYS).findIntent('Hello'))
    .rejects.toContain(MOCK_KEYS.dev_key)
  })
})

describe('AI Entity Usage', () => {
  test('Should initialize Entity', () => {
    const entity = new AIEntity(REAL_KEYS)
    return expect(entity.initialized)
    .resolves.toBe(entity)
  })

  test('Should find `isYes` intents', () => {
    const entity = new AIEntity(REAL_KEYS)
    return expect(entity.initialized.then(() => {
      return entity.confirmation.isYes('sure')
    }))
    .resolves.toBeTruthy()
  })

  test('Should find `isNo` intents', () => {
    const entity = new AIEntity(REAL_KEYS)
    return expect(entity.initialized.then(() => {
      return entity.confirmation.isNo('never')
    }))
    .resolves.toBeTruthy()
  })

  test('Yes or No', () => {
    const entity = new AIEntity(REAL_KEYS)
    return entity.findIntent('Not today')
    .then(({ action }) => ([
      entity.confirmation.yes === action,
      entity.confirmation.no === action
    ]))
    .then(res => expect(res[1]).toBeTruthy())
  })
})

describe('Display Entity', () => {
  test('Should log the API', () => {
    const opts = Object.assign({ logging: true }, REAL_KEYS)
    const entity = new AIEntity(opts)
    return expect(entity.initialized)
    .resolves.toBe(entity)
  })
})
