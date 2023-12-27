const Web3 = require("web3")
const { privateKey, node } = require("../constants")

const web3 = new Web3(node)

function restoreAccount() {
  const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey)
  console.log("restored account:", accountFrom)
  return accountFrom
}


module.exports = restoreAccount