function promisify (fn) {
  return new Promise((res, rej) => {
    fn((err, response) => {
      if (err) return rej(err)
      res(response.body)
    })
  })
  .then(res => JSON.parse(res))
  .then(res => {
    if (res.status && res.status.errorDetails) {
      return Promise.reject(res.status.errorDetails)
    }
    return res
  })
}

module.exports = promisify
