const { app } = require('@azure/functions');
const validTransactionId = require('../utils/validTransactionId');
const getDocumentHash = require('../blockchain/getDocumentHash');

app.http("bkch-doc-entry", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`)
    try {
      const url = new URL(request.url)
      const transactionId = url.searchParams.get("transactionId")

      if (!transactionId) {
        const response = {
          message: "TransactionId parameter is missing in the query.",
        }
        return {
          status: 400,
          body: JSON.stringify(response),
          headers: { "Content-Type": "application/json" },
        }
      }

      if (!validTransactionId(transactionId)) {
        const response = {
          message: "TransactionId parameter is not a valid transaction."
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
      const documentHash = await getDocumentHash(transactionId)
      const timestamp = transactionId.slice(0, transactionId.indexOf("Z") + 1)

      const response = {
        entry: {
          contents: {
            documentHash,
            timestamp
          },
          transactionId
        }
      }

      return {
        status: 200,
        body: JSON.stringify(response),
        headers: { "Content-Type": "application/json" },
      }
    } catch (error) {
      context.log.error(`Error processing request: ${error}`)
      return {
        status: 500, // Internal Server Error
        body: "Internal Server Error",
      }
    }
  }
})


