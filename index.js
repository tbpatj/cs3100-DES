const {
  getBitAtIndex,
  setBitAtIndex,
  getBitChunk,
  printBits,
  printAllBits,
  getBitAtPos,
  setBitAtPos,
  rotateBitsLeft,
  rotateBitsRight,
} = require("./src/bit-operations");
const { bitsWHighlight, highlightBitsAtIndex } = require("./src/bit-printing");
const { permutation } = require("./src/permutations");
const { PC1 } = require("./src/tables");

function main() {
  //add the b for binary, add the n because it's a big int and if you don't it will do some weiird bit shifting stuff
  //   let base = BigInt(
  //     "0b0001001100110100010101110111100110011011101111001101111111110001"
  //   );

  let test = BigInt(0b000101n);
  let n = rotateBitsRight(test, 1, 6);
  console.log(printAllBits(test, 6));
  console.log(printAllBits(n, 6));

  //   let p = permutation(PC1, base);
  //   console.log("k+", printAllBits(p, 56));
  //   //r0 is technically opposite, according to tutorial
  //   let d0 = getBitChunk(p, 28, 0);
  //   let c0 = getBitChunk(p, 28, 28);
  //   console.log("\nc0", printAllBits(c0, 28));
  //   console.log("d0", printAllBits(d0, 28));
  //   base = setBitAtIndex(base, 0, 1);
  //   console.log(highlightBitsAtIndex(base, 0));
}

main();
