const axios = require("axios")
const { address, node } = require("../constants.js")

module.exports = getNonce = async () => {
  const method = "eth_getTransactionCount"
  const postData = {
    jsonrpc: "2.0",
    method: method,
    params: [address, "latest"],
    id: "getblock.io",
  }
  try {
    const response = await axios.post(`${node}`, postData, {
      headers: { "Content-Type": "application/json" },
    })
    const nonce = response.data.result
    console.log('current nonce:', nonce)
    return nonce
  } catch (error) {
    console.log('getNonce failed: ', error.message)
  }
}
