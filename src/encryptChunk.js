const { getBitChunk } = require("./bit-operations");
const { f } = require("./functionF");
const { permutation } = require("./permutations");
const { IP, FinalP } = require("./tables");

const encryptChunk = (block, keys) => {
  let ip = permutation(IP, block);

  //split the 64 bit number into two 32 bit numbers
  const l0 = getBitChunk(ip, 32, 32);
  const r0 = getBitChunk(ip, 32, 0);

  //do rounds
  let r = r0;
  let l = l0;
  for (let i = 0; i < 16; i++) {
    const newR = f(r, keys[i]) ^ l;
    l = r;
    r = newR;
  }

  const combined = (r << 32n) | l;
  const encrypted = permutation(FinalP, combined, 64);
  return encrypted;
};

module.exports = { encryptChunk };
