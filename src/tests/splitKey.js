const { getBitChunk } = require("../bit-operations");
const assert = require("assert");

function splitKey(k) {
  let expectedC0 = 0b1111000011001100101010101111n;
  let expectedD0 = 0b0101010101100110011110001111n;

  let actualC0 = getBitChunk(k, 28, 28);
  let actualD0 = getBitChunk(k, 28, 0);

  try {
    assert.strictEqual(actualC0, expectedC0, "Values do not match!");
    console.log("✅ Split C0 Test passed");
  } catch (error) {
    console.error("❌ C0 Test failed:", error.message);
  }

  try {
    assert.strictEqual(actualD0, expectedD0, "Values do not match!");
    console.log("✅ Split D0 Test passed");
  } catch (error) {
    console.error("❌ D0 Test failed:", error.message);
  }

  return { c0: actualC0, d0: actualD0 };
}

module.exports = { splitKey };
