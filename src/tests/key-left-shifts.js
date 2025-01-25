const { rotateBitsLeft } = require("../bit-operations");
const { PCShifts } = require("../tables");
const assert = require("assert");

const shiftAns = {
  C0: "0b1111000011001100101010101111",
  D0: "0b0101010101100110011110001111",

  C1: "0b1110000110011001010101011111",
  D1: "0b1010101011001100111100011110",

  C2: "0b1100001100110010101010111111",
  D2: "0b0101010110011001111000111101",

  C3: "0b0000110011001010101011111111",
  D3: "0b0101011001100111100011110101",

  C4: "0b0011001100101010101111111100",
  D4: "0b0101100110011110001111010101",

  C5: "0b1100110010101010111111110000",
  D5: "0b0110011001111000111101010101",

  C6: "0b0011001010101011111111000011",
  D6: "0b1001100111100011110101010101",

  C7: "0b1100101010101111111100001100",
  D7: "0b0110011110001111010101010110",

  C8: "0b0010101010111111110000110011",
  D8: "0b1001111000111101010101011001",

  C9: "0b0101010101111111100001100110",
  D9: "0b0011110001111010101010110011",

  C10: "0b0101010111111110000110011001",
  D10: "0b1111000111101010101011001100",

  C11: "0b0101011111111000011001100101",
  D11: "0b1100011110101010101100110011",

  C12: "0b0101111111100001100110010101",
  D12: "0b0001111010101010110011001111",

  C13: "0b0111111110000110011001010101",
  D13: "0b0111101010101011001100111100",

  C14: "0b1111111000011001100101010101",
  D14: "0b1110101010101100110011110001",

  C15: "0b1111100001100110010101010111",
  D15: "0b1010101010110011001111000111",

  C16: "0b1111000011001100101010101111",
  D16: "0b0101010101100110011110001111",
};

const testShifts = (c, d, round) => {
  let nC = BigInt(c);
  let nD = BigInt(d);
  if (round !== 0) {
    nC = rotateBitsLeft(nC, PCShifts[round - 1], 28);
    nD = rotateBitsLeft(nD, PCShifts[round - 1], 28);
  }
  const expectedC = BigInt(shiftAns[`C${round}`]);
  const expectedD = BigInt(shiftAns[`D${round}`]);

  try {
    assert.strictEqual(nC, expectedC, "Values do not match!");
    console.log(`✅ C${round} Test passed`);
  } catch (error) {
    console.error(`❌ C${round} Test failed:`, error.message);
  }

  try {
    assert.strictEqual(nD, expectedD, "Values do not match!");
    console.log(`✅ D${round} Test passed`);
  } catch (error) {
    console.error(`❌ D${round} Test failed:`, error.message);
  }
  return { c: nC, d: nD };
};

module.exports = { testShifts };
