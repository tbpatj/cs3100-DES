const assert = require("assert");
const { decrypt } = require("../decrypt");

const key = 0b0001001100110100010101110111100110011011101111001101111111110001n;

const encrypted =
  0b1000010111101000000100110101010000001111000010101011010000000101n;

const r16l16Ans =
  0b0000101001001100110110011001010101000011010000100011001000110100n;

const l16Ans = 0b01000011010000100011001000110100n;
const r16Ans = 0b00001010010011001101100110010101n;

const m = 0b0000000100100011010001010110011110001001101010111100110111101111n;

const decryptionTest = () => {
  console.log("------ Decryption Tests ------");

  const decrypted = decrypt(encrypted, key, false);

  try {
    assert.strictEqual(decrypted, m, "Values do not match!");
    console.log("✅ decrypted Test passed");
  } catch (error) {
    console.error("❌ decrypted Test failed:", error.message);
  }
};

module.exports = { decryptionTest };
