const axios = require("axios")
const { node } = require("./constants")

const estimateGasPrice = async () => {
  const method = "eth_gasPrice"
  const postData = {
    jsonrpc: "2.0",
    method: method,
    params: [],
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

module.exports = estimateGasPrice
