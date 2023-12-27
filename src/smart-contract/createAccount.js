const Web3 = require("web3")
const { node } = require("./constants")

const web3 = new Web3(node)

function createAccount() {
  // Generate new address and private key
  const accountTo = web3.eth.accounts.create()
  console.log(accountTo)
  return accountTo
}

module.exports = createAccount
