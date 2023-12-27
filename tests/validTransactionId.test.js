const isValidTransactionId = require("../src/utils/validTransactionId")

describe("isValidTransactionId", () => {
  test("should return true for a valid transaction ID", () => {
    const validTransactionId =
      "2023-01-01T12:34:56.789Z-01234567-89ab-cdef-0123-456789abcdef"
    const result = isValidTransactionId(validTransactionId)

    expect(result).toBe(true)
  })

  test("should return false for an invalid transaction ID with non-hex characters", () => {
    const invalidTransactionId = "2023-01-01T12:34:56.789Z-invalid-id"
    const result = isValidTransactionId(invalidTransactionId)

    expect(result).toBe(false)
  })

  test("should return false for an invalid transaction ID with incorrect length", () => {
    const invalidLengthTransactionId =
      "2023-01-01T12:34:56.789Z-0123456789abcdef0123456789abcde"
    const result = isValidTransactionId(invalidLengthTransactionId)

    expect(result).toBe(false)
  })

  test("should return false for an invalid transaction ID with incorrect timestamp format", () => {
    const invalidTimestampFormatId =
      "2023-01-01T12:34:56-01234567-89ab-cdef-0123-456789abcdef"
    const result = isValidTransactionId(invalidTimestampFormatId)

    expect(result).toBe(false)
  })
})
