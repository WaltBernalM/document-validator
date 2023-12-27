const axios = require("axios")
const { node } = require("../constants.js")

const estimateGas = async () => {
  const method = "eth_estimateGas"
  const postData = {
    jsonrpc: "2.0",
    method: method,
    params: [
      {
        from: "0x949B38745913D3f5EE021295aA56Dc1F0F17EE9f",
        to: null,
        value: "0x0",
      },
    ],
    id: "getblock.io",
  }
  try {
    const response = await axios.post(`${node}`, postData, {
      headers: { "Content-Type": "application/json" },
    })
    return response.data.result
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = estimateGas
