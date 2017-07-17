function first (arr) {
  return [].concat(arr).reduce(function (f, c, i) {
    if (i === 0) return c
    return f
  }, null)
}

module.exports = {
  first
}
