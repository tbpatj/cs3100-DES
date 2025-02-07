const { bigIntToHex } = require("./encrypt");
const { encryptChunk } = require("./encryptChunk");
const { getSubKeys } = require("./getSubKeys");

const decrypt = (data, key, isHex = false) => {
  const keys = getSubKeys(isHex ? BigInt(`0x${key}`) : BigInt(key)).reverse();
  let m = data;

  if (isHex) {
    const hexString = data.replace("0x", "");
    m = BigInt(`0x${hexString}`);
  }

  let res = encryptChunk(BigInt(m), keys);

  if (isHex) {
    res = bigIntToHex(res);
  }

  return res;
};

module.exports = { decrypt };
