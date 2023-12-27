const ethers = require("ethers")
const getABI = require("./getABI")
const { privateKey, node: nodeUrl, contractAddress } = require("./constants")
const config = require('dotenv').config
config()

async function storeDocumentHash(transactionCode, documentHash) {
  try {
    const provider = ethers.getDefaultProvider(nodeUrl)
    const wallet = new ethers.Wallet(privateKey, provider)
    const contractABI = getABI("src/blockchain/BookHashStorage.sol")

    const contract = new ethers.Contract(contractAddress, contractABI, wallet)

    const transaction = await contract.storeBookHash(
      transactionCode,
      documentHash
    )
    const contractTransacitonReceipt = await transaction.wait()
    
    return contractTransacitonReceipt
  } catch (error) {
    if (error && error.info && error.info.error) {
      // console.error("Smart contract call failed:", error.info.error.message)
      return `Smart contract call failed:, ${error.info.error.message}`
    } else {
      // console.error("An unexpected error occurred:", error)
      return `An unexpected error occurred: ${error}`
    }
  }
}

// const documentHash3 =
//   "0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdez"
// const transactionCode3 = "0-1278-5049-Z"
// storeDocumentHash(transactionCode3, documentHash3)

module.exports = storeDocumentHash