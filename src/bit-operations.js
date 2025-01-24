const { bitsWHighlight } = require("./bit-printing");

function getBitAtIndex(number, index) {
  // Convert to BigInt to handle large indices
  const n = BigInt(number);
  let r = n.toString(2).padStart(64, "0")[index];
  r = BigInt(r);
  return r;
}

function setBitAtIndex(number, index, value) {
  const n = BigInt(number);
  if (value === 1n || value === 1 || value === 0b1 || value === 0b1n) {
    return n | (1n << BigInt(63 - index));
  } else {
    return n & ~(1n << BigInt(63 - index));
  }
}

function getBitAtPos(number, position) {
  const n = BigInt(number);
  const p = BigInt(position - 1); // Convert to 0-based index
  console.log(bitsWHighlight(n, position));
  return (n >> p) & 1n;
}

function setBitAtPos(number, position, value) {
  const n = BigInt(number);
  const p = BigInt(position - 1); // Convert to 0-based index
  if (value === 1n) {
    return n | (1n << p); // Set bit
  } else {
    return n & ~(1n << p); // Clear bit
  }
}

function getBitChunk(chunk, amount, offset) {
  const n = BigInt(chunk);
  const a = BigInt(amount);
  const o = BigInt(offset);
  return (n >> o) & ((1n << a) - 1n);
}

function printBits(number) {
  return BigInt(number).toString(2);
}

function printAllBits(number, padding = 64) {
  const n = BigInt(number);
  if (n < 0) {
    // Create mask for padding bits
    const mask = (1n << BigInt(padding)) - 1n;
    // Convert negative to positive representation
    return (n & mask).toString(2).padStart(padding, "0");
  }
  return n.toString(2).padStart(padding, "0");
}

function rotateBitsLeft(number, amount, padding = 64) {
  const n = BigInt(number);
  const a = BigInt(amount);
  const p = BigInt(padding);
  //create a mask to get the bits that will shift out of focus
  let mask = ~0n << (p - a);
  console.log(printAllBits(mask, 64));
  //create a second mask to clear any bits outside of the padding
  let mask2 = ~(~0n << p);
  //get the bits that will fall off the edge
  let overflow = (n & mask) >> (p - a);
  //mask the overflow to make sure no bits are outside of what is actually shifting, (this prevents 1s from being pulled in from the left most bit, because if the leftmoost bit is a 1 and you shift right you get new 1s trailing)
  let mask3 = ~(~0n << a);
  overflow = overflow & mask3;
  //shift the original bits over, and then add the overflow bits to the right side, and then mask it to make sure we have the right amount of bits
  let r = ((n << a) | overflow) & mask2;
  return r;
}

function rotateBitsRight(number, amount, padding = 64) {
  const n = BigInt(number);
  const a = BigInt(amount);
  const p = BigInt(padding);
  let mask = ~0n >> a;
  console.log(printAllBits(mask, 64));
  let mask2 = ~(~0n << p);
  let overflow = (n & mask) >> (p - a);
  let r = ((n << a) | overflow) & mask2;
  return r;
}

module.exports = {
  getBitAtIndex,
  setBitAtIndex,
  getBitChunk,
  printBits,
  printAllBits,
  getBitAtPos,
  setBitAtPos,
  rotateBitsLeft,
  rotateBitsRight,
};
