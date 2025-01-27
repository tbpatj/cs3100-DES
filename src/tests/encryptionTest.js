const { getBitChunk, printAllBits } = require("../bit-operations");
const { encryptChunk } = require("../encryptChunk");
const { f } = require("../functionF");
const { getSubKeys } = require("../getSubKeys");
const { permutation } = require("../permutations");
const { sBox } = require("../sbox");
const { IP, Expansion, FinalP, fP } = require("../tables");
const assert = require("assert");

const ipAns =
  0b1100110000000000110011001111111111110000101010101111000010101010n;

const l0Ans = 0b11001100000000001100110011111111n;

const r0Ans = 0b11110000101010101111000010101010n;

const r0ExpanAns = 0b011110100001010101010101011110100001010101010101n;

const r0XorK1Ans = 0b011000010001011110111010100001100110010100100111n;

const sboxAns = 0b01011100100000101011010110010111n;

const finalPAns = 0b00100011010010101010100110111011n;

const r1Ans = 0b11101111010010100110010101000100n;

const l16Ans = 0b01000011010000100011001000110100n;
const r16Ans = 0b00001010010011001101100110010101n;

const r16l16Ans =
  0b0000101001001100110110011001010101000011010000100011001000110100n;

const finalAns =
  0b1000010111101000000100110101010000001111000010101011010000000101n;

const encryptionTest = () => {
  let key = BigInt(
    "0b0001001100110100010101110111100110011011101111001101111111110001"
  );
  const keys = getSubKeys(key);
  let m = 0b0000000100100011010001010110011110001001101010111100110111101111n;
  let ip = permutation(IP, m);

  try {
    assert.strictEqual(ip, ipAns, "Values do not match!");
    console.log("✅ IP Test passed");
  } catch (error) {
    console.error("❌ IP Test failed:", error.message);
  }

  //split the 64 bit number into two 32 bit numbers
  let l0 = getBitChunk(ip, 32, 32);
  let r0 = getBitChunk(ip, 32, 0);

  try {
    assert.strictEqual(l0, l0Ans, "Values do not match!");
    console.log("✅ l0 Test passed");
  } catch (error) {
    console.error("❌ l0 Test failed:", error.message);
  }

  try {
    assert.strictEqual(r0, r0Ans, "Values do not match!");
    console.log("✅ r0 Test passed");
  } catch (error) {
    console.error("❌ r0 Test failed:", error.message);
  }
  //function f

  //expansion
  let r0e = permutation(Expansion, r0, 32);
  try {
    assert.strictEqual(r0e, r0ExpanAns, "Values do not match!");
    console.log("✅ r0 expansion Test passed");
  } catch (error) {
    console.error("❌ r0 expansion Test failed:", error.message);
  }

  //xor
  let xorR0 = r0e ^ keys[0];

  try {
    assert.strictEqual(xorR0, r0XorK1Ans, "Values do not match!");
    console.log("✅ r0 xor K1 Test passed");
  } catch (error) {
    console.error("❌ r0 xor K1 Test failed:", error.message);
  }

  const sbox = sBox(xorR0);
  try {
    assert.strictEqual(sbox, sboxAns, "Values do not match!");
    console.log("✅ SBox Test passed");
  } catch (error) {
    console.error("❌ SBox Test failed:", error.message);
  }

  //final permutation
  const fp = permutation(fP, sbox, 32);

  try {
    assert.strictEqual(fp, finalPAns, "Values do not match!");
    console.log("✅ final permutation Test passed");
  } catch (error) {
    console.error("❌ final permutation Test failed:", error.message);
  }

  //test function f
  const fActual = f(r0, keys[0]);
  try {
    assert.strictEqual(fActual, finalPAns, "Values do not match!");
    console.log("✅ f Test passed");
  } catch (error) {
    console.error("❌ f Test failed:", error.message);
  }

  const r1 = f(r0, keys[0]) ^ l0;
  const l1 = r0;

  try {
    assert.strictEqual(r1, r1Ans, "Values do not match!");
    console.log("✅ r1 Test passed");
  } catch (error) {
    console.error("❌ r1 Test failed:", error.message);
  }

  let r = r0;
  let l = l0;
  for (let i = 0; i < 16; i++) {
    const newR = f(r, keys[i]) ^ l;
    l = r;
    r = newR;
  }

  try {
    assert.strictEqual(r, r16Ans, "Values do not match!");
    console.log("✅ r16 Test passed");
  } catch (error) {
    console.error("❌ r16 Test failed:", error.message);
  }

  try {
    assert.strictEqual(l, l16Ans, "Values do not match!");
    console.log("✅ l16 Test passed");
  } catch (error) {
    console.error("❌ l16 Test failed:", error.message);
  }

  let combined = (r << 32n) | l;

  try {
    assert.strictEqual(combined, r16l16Ans, "Values do not match!");
    console.log("✅ combined Test passed");
  } catch (error) {
    console.error("❌ combined Test failed:", error.message);
  }

  const encrypted = permutation(FinalP, combined, 64);

  try {
    assert.strictEqual(encrypted, finalAns, "Values do not match!");
    console.log("✅ encrypted Test passed");
  } catch (error) {
    console.error("❌ encrypted Test failed:", error.message);
  }

  const encrypted2 = encryptChunk(m, keys);
  try {
    assert.strictEqual(encrypted2, finalAns, "Values do not match!");
    console.log("✅ encrypted2 Test passed");
  } catch (error) {
    console.error("❌ encrypted2 Test failed:", error.message);
  }
};

module.exports = { encryptionTest };
