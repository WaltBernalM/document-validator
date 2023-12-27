const ethers = require("ethers")
const getABI = require("./getABI")
const { node, privateKey, contractAddress } = require("./constants")
const config = require("dotenv").config
config()


const nodeUrl = node
const provider = ethers.getDefaultProvider(nodeUrl)

const wallet = new ethers.Wallet(privateKey, provider)
const contractABI = getABI("src/smart-contract/BookHashStorage.sol")
const contract = new ethers.Contract(contractAddress, contractABI, wallet)

async function getDocumentHash(transactionCode) {
  try {
    const documentHash = await contract.getBookHash(transactionCode)
    console.log("Retrieved Document Hash:", documentHash)
    return documentHash
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

// getDocumentHash("2023-12-27T01:46:14.811Z-b5896c85-d31e-4c9c-ac3d-759e7ebff63b")

module.exports = getDocumentHash