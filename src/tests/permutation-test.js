const { permutation } = require("../permutations");
const { PC1 } = require("../tables");
const assert = require("assert");

function testP1Permutation(test) {
  let base = BigInt(
    "0b0001001100110100010101110111100110011011101111001101111111110001"
  );
  let actual = permutation(PC1, base);
  11110001111001100110101010101111010101010011001100001111;
  let expected = 0b11110000110011001010101011110101010101100110011110001111n;

  try {
    assert.strictEqual(actual, expected, "Values do not match!");
    console.log("✅ Key Permutation Test passed");
  } catch (error) {
    console.error(
      "❌ Key Permutation Test failed:",
      error.message,
      actual,
      expected
    );
  }
  return actual;
}

module.exports = { testP1Permutation };
