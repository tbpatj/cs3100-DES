const { getBitChunk, printAllBits } = require("./bit-operations");
const { SBox } = require("./tables");

const sBox = (chunk) => {
  const LeftMask = 0b100000n;
  const rightMask = 0b000001n;
  const middleMask = 0b011110n;
  let results = [];
  for (let i = 0; i < 8; i++) {
    const slot = getBitChunk(chunk, 6, 6 * (7 - i));
    const row = ((LeftMask & slot) >> 4n) | (rightMask & slot);
    const col = (middleMask & slot) >> 1n;
    const result = SBox[i][row][col];
    // console.log(
    //   "initial: " + printAllBits(slot, 6),
    //   "round: " + i,
    //   "row: " + row + " " + printAllBits(row, 2),
    //   "col: " + col + " " + printAllBits(col, 4),
    //   "result: " + result
    // );
    results.push(result.toString(2).padStart(4, "0"));
  }
  //   console.log(results.join(" "));
  const result = BigInt("0b" + results.join("") + "");
  return result;
};

module.exports = { sBox };
