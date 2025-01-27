const { setBitAtIndex, getBitAtIndex } = require("./bit-operations");
// const { highlightBitsAtIndex } = require("./bit-printing");

//Permutation only work accoording to the https://page.math.tu-berlin.de/~kant/teaching/hess/krypto-ws2006/des.htm
//if all bits are aligned to the left, so you need to shift the amount of open bits to the left, say you have 56 bits, shift it left 8 bits.
function permutation(table, block, bits = 64) {
  block = block << (64n - BigInt(bits));
  let result = BigInt(0);
  for (let i = 0; i < table.length; i++) {
    //we use index, which reads left to right, instead of right to left like how javascript interprets the bits or prints them out
    result = setBitAtIndex(result, i, getBitAtIndex(block, table[i] - 1));
    //DEBUGGING
    // console.log(highlightBitsAtIndex(result, i));
  }
  //might need to remove this next line
  //just shift the bits over to remove empty spots, without this we would be working with a 64 bit number always, we shift it to make sure it's in the right bitset
  result = result >> (64n - BigInt(table.length));
  return result;
}

module.exports = { permutation };
