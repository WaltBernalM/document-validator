const Web3 = require("web3")
const axios = require("axios")
const getContractRawTx = require("./getContractRawTx")
const { node } = require("..constants")
const estimateGas = require("./estimateGas")
const gasPrice = require("./estimateGasPrice")

const publishSmartContract = async () => {
  const method = "eth_sendRawTransaction"
  const rawTx = await getContractRawTx()
  const postData = {
    jsonrpc: "2.0",
    method: method,
    params: [rawTx],
    id: "getblock.io",
  }
  try {
    const response = await axios.post(`${node}`, postData, {
      headers: { "Content-Type": "application/json" },
    })
    return response
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = publishSmartContract