const { v4: uuidv4 } = require("uuid")

module.exports = function generateTransactionId() {
  const timestamp = new Date().toISOString()
  const uniqueId = uuidv4()
  return String(`${timestamp}-${uniqueId}`)
}
