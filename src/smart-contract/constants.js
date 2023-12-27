const config = require('dotenv').config
config()

const address = process.env.GET_BLOCK_ADDRESS
const privateKey = process.env.GET_BLOCK_PRIVATE_KEY
const apikey = process.env.GET_BLOCK_API_KEY

const network = "testnet" // Change to mainnet for production
const chainId = 97 // 97 is BSC testnet, 95 is BSC mainnet
const node = `https://go.getblock.io/${apikey}/`

const contractAddress = process.env.GET_BLOCK_CONTRACT_ADDRESS

module.exports = {
  address,
  privateKey,
  apikey,
  network,
  chainId,
  node,
  contractAddress,
}