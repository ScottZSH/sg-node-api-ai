function capitalize (text) {
  return ''
  .concat(text.slice(0, 1).toUpperCase())
  .concat(text.slice(1).toLowerCase())
}

function capitalCase (text) {
  return text.split(/[\ \.-_]/g)
  .map(capitalize)
  .join('')
}

module.exports = {
  capitalize,
  capitalCase
}
