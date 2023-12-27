const axios = require("axios")
const { node } = require("./constants")

const getTxReceiptByTxHash  = async (transactionHash) => {
  const method = "eth_getTransactionReceipt"
  const postData = {
    jsonrpc: "2.0",
    method: method,
    params: [ transactionHash ],
    id: "getblock.io",
  }
  try {
    const response = await axios.post(`${node}`, postData, {
      headers: { "Content-Type": "application/json" },
    })
    console.log(response.data.result)
    return response.data.result
  } catch (error) {
    console.log(error.message)
  }
}

// getTxReceiptByTxHash(
//   "0x2824d2ee61f6eae0cc1a26d9e96b21cad1750f52db49a1a0824cef28af831272"
// )

module.exports = getTxReceiptByTxHash
