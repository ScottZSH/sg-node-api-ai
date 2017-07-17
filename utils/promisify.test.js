/*global describe test expect*/

const promisify = require('./promisify')

describe('Promisify', () => {

  test('Should reject on runtime error', () => {
    return expect(promisify(function (cb) {
      const a = {}
      cb(null, a.b.c)
    })).rejects.toBeInstanceOf(Error)
  })

  test('Should reject if error response', () => {
    const error = 'Promisify Error'
    return expect(promisify(function (cb) {
      cb(error, null)
    })).rejects.toBe(error)
  })

  test('Should resolve when callback is executed', () => {
    const data = { a: 1, b: 2 }
    const body = { body: JSON.stringify(data) }
    return expect(promisify(function (cb) {
      cb(null, body)
    })).resolves.toEqual(data)
  })

})
