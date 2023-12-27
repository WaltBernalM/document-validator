const { app } = require('@azure/functions');
const validHash = require('../utils/validHash')
const generateTransactionId = require('../utils/generateTransactionId');
const storeDocumentHash = require('../blockchain/storeDocumentHash');

app.http("bkch-doc", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`)
    const requestBody = await request.text()
    try {
      // Validate if hash is in body
      const jsonBody = JSON.parse(requestBody)
      if (!("hash" in jsonBody)) {
        const response = { message: "Hash property is missing in the JSON" }
        return {
          status: 400,
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        }
      }

      // Validate if hash is in valid format
      const hash = jsonBody.hash
      if (!validHash(hash)) {
        const response = { message: "Hash not valid" }
        return {
          status: 400,
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        }
      }

      /****************************************************************************************************************/
      /* Blockchain Interaction */
      /****************************************************************************************************************/
      const UUID = generateTransactionId()

      transactionReceipt = await storeDocumentHash(UUID, hash)

      const response = {
        receipt: transactionReceipt,
        transacitonId: UUID,
      }

      return {
        status: 201,
        body: JSON.stringify(response),
        headers: { "Content-Type": "application/json" },
      }
    } catch (error) {
      return {
        status: 400,
        body: "Invalid JSON format" + error,
      }
    }
  },
})


