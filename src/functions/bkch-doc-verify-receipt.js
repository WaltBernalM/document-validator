const { app } = require('@azure/functions');
const getTxReceiptByTxHash = require('../blockchain/getTxReceiptByTxHash');

app.http("bkch-doc-verify-receipt", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`)
    const requestBody = await request.text()
    try {
      // Validate if recipt in body
      const jsonBody = JSON.parse(requestBody)
      if (!("receipt" in jsonBody)) {
        const response = { message: "receipt is missing in the JSON" }
        return {
          status: 400,
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        }
      }

      // Validate receipt content
      const receipt = jsonBody.receipt
      const {
        _type,
        blockHash,
        blockNumber,
        from,
        gasPrice,
        gasUsed,
        cumulativeGasUsed,
        hash,
        index,
        to,
      } = receipt

      let receiptIsValid = null
      if (
        !_type ||
        !blockHash ||
        !blockNumber ||
        !cumulativeGasUsed ||
        !from ||
        !gasPrice ||
        !gasUsed ||
        !hash ||
        !index ||
        !to
      ) {
        receiptIsValid = false
        const response = {
          failureMessage: "Invalid receipt content",
          receiptIsValid,
        }
        return {
          status: 400,
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        }
      }

      /****************************************************************************************************************/
      /* Blockchain Interaction */
      /****************************************************************************************************************/
      const receiptFromBlockchain = await getTxReceiptByTxHash(hash)
      const {
        blockHash: rBlockHash,
        blockNumber: rBlockNumber,
        cumulativeGasUsed: rCumulativeGasUsed,
        from: rFrom,
        gasUsed: rGasUsed,
        effectiveGasPrice: rGasPrice,
        transactionHash: rHash,
        transactionIndex: rIndex,
        to: rTo,
      } = receiptFromBlockchain

      const blockNumberHex = "0x" + Number(blockNumber).toString(16)
      const gasPriceHex = "0x" + Number(gasPrice).toString(16)
      const gasUsedHex = "0x" + Number(gasUsed).toString(16)
      const cumulativeGasUsedHex = "0x" + Number(cumulativeGasUsed).toString(16)
      const indexHex = "0x" + Number(index).toString(16)

      // Verify that the values match for the specified properties
      const propertiesMatch =
        blockHash === rBlockHash &&
        blockNumberHex === rBlockNumber &&
        from.toLowerCase() === rFrom &&
        gasPriceHex === rGasPrice &&
        gasUsedHex === rGasUsed &&
        cumulativeGasUsedHex === rCumulativeGasUsed &&
        hash === rHash &&
        indexHex === rIndex &&
        to.toLowerCase() === rTo

      // If propertiesMatch is false, the values don't match
      if (!propertiesMatch) {
        receiptIsValid = false
        const response = {
          receiptIsValid,
          failureMessage: "Invalid receipt values"
        }
        return {
          status: 400,
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        }
      }

      receiptIsValid = true
      const response = {
        receiptIsValid
      }
      return {
        status: 200,
        body: JSON.stringify(response),
        headers: { "Content-Type": "application/json" },
      }
    } catch (error) {
      // context.log.error(`Error processing request: ${error}`)
      return {
        status: 500, // Internal Server Error
        body: "Internal Server Error: " + error,
      }
    }
  },
})


