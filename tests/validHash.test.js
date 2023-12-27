const validHash = require("../src/utils/validHash")

describe("validHash", () => {
  test("should return true for a valid hash string", () => {
    const validHashString =
      "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    const result = validHash(validHashString)

    expect(result).toBe(true)
  })

  test("should return false for an invalid hash string with non-hex characters", () => {
    const invalidHashString = "0xinvalidhash123"
    const result = validHash(invalidHashString)

    expect(result).toBe(false)
  })

  test("should return false for an invalid hash string with incorrect length", () => {
    const invalidLengthHashString =
      "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcde"
    const result = validHash(invalidLengthHashString)

    expect(result).toBe(false)
  })
})
