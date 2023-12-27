const generateTransactionId = require("../src/utils/generateTransactionId")

describe("generateTransactionId", () => {
  test("should generate a valid transaction ID", () => {
    const result = generateTransactionId()

    expect(typeof result).toBe("string")
    
    const pattern =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
    
    expect(result).toMatch(pattern)
  })
})