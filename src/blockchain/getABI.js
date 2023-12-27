const fs = require("fs")
const solc = require("solc")

module.exports = function getABI(contractPath) {
  const contractCode = fs.readFileSync(contractPath, "utf8")

  // Compile the Solidity code
  const input = {
    language: "Solidity",
    sources: {
      [contractPath]: {
        content: contractCode,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  }

  const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)))

  // Extract and output the ABI
  const contractFileName = Object.keys(compiledCode.contracts[contractPath])[0]
  // const contractABI =
  //   compiledCode.contracts[contractPath][
  //     Object.keys(compiledCode.contracts[contractPath])[0]
  //   ].abi
  // console.log(JSON.stringify(contractABI, null, 2))
  const contractABI = compiledCode.contracts[contractPath][contractFileName].abi

  return contractABI
}