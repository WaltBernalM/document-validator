const fs = require("fs")
const getNonce = require("./getNonce")
const { privateKey: privateKeyString } = require("../constants.js")
const estimateGas = require("./estimateGas")
const estimateGasPrice = require("./estimateGasPrice")
const EthereumTx = require("ethereumjs-tx").Transaction

async function getContractRawTx() {
  const privateKey = Buffer.from(`${privateKeyString.slice(2)}`, "hex")
  const toAddress = null

  // Step 1: Read the compiled bytecode from the file
  const bytecodePath = "bin/src/blockchain/smart-contract/BookHashStorage.bin" // Update the path accordingly
  const bytecode = fs.readFileSync(bytecodePath, "utf8").trim()

  const gasPrice = await estimateGasPrice()
  const gasLimit = await estimateGas()
  const value = "0x00"

  const currentNonce = await getNonce()

  // Step 2: Create Raw Transaction
  const contract = new EthereumTx(
    {
      nonce: currentNonce,
      gasPrice: gasPrice,
      gasLimit: "0x105256A",
      to: toAddress,
      value: value,
      data: "0x" + bytecode,
    },
    {
      chain: "goerli",
      hardfork: "petersburg",
    }
  )

  contract.sign(privateKey)
  const serializedTx = contract.serialize()
  const rawTx = "0x" + serializedTx.toString("hex")

  console.log("rawTx length:", rawTx.length)
  return rawTx
}

getContractRawTx()

module.exports = getContractRawTx