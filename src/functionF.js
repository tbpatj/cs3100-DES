const { permutation } = require("./permutations");
const { sBox } = require("./sbox");
const { Expansion, fP } = require("./tables");

//uses a 32 bit block and a 48 bit key to produce a 32 bit block
const f = (block, key) => {
  const e = permutation(Expansion, block, 32);
  const xor = e ^ key;
  const sbox = sBox(xor);
  const fp = permutation(fP, sbox, 32);
  return fp;
};

module.exports = { f };
