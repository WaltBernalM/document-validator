const Web3 = require("web3")
const axios = require("axios")
const getContractRawTx = require("./getContractRawTx")
const { privateKey, node } = require("./constants")
const estimateGas = require("./estimateGas")
const gasPrice = require("./estimateGasPrice")

const web3 = new Web3(node)

function createAccount() {
  // Generate new address and private key
  const accountTo = web3.eth.accounts.create()
  console.log(accountTo)
}

function restoreAccount() {
  const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey)
  console.log("restored account:", accountFrom)
}

// createAccount()
restoreAccount()

const sendRawTransaction = async () => {
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

async function index() {
  try {
    const response = await sendRawTransaction()
    console.log("Transaction sent successfully:", response.data.result)
  } catch (error) {
    console.error("Error in index:", error.message)
  }
}

index()
