module.exports = function validHash(str) {
  hashString = str.slice(2)
  const hexRegex = /^[0-9a-fA-F]+$/
  return hexRegex.test(hashString) && hashString.length === 64
}
