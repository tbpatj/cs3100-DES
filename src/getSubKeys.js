const { getBitChunk, rotateBitsLeft } = require("./bit-operations");
const { permutation } = require("./permutations");
const { PCShifts, PC1, PC2 } = require("./tables");

const getSubKeys = (iKey) => {
  let keys = [];
  let k = permutation(PC1, iKey);

  let c0 = getBitChunk(k, 28, 28);
  let d0 = getBitChunk(k, 28, 0);

  for (let i = 1; i < 17; i++) {
    c0 = rotateBitsLeft(c0, PCShifts[i - 1], 28);
    d0 = rotateBitsLeft(d0, PCShifts[i - 1], 28);
    let subKey = (c0 << 28n) | d0;
    let key = permutation(PC2, subKey, 56);
    keys.push(key);
  }
  return keys;
};

module.exports = { getSubKeys };
