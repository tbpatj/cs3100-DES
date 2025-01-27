const { encryptChunk } = require("./encryptChunk");
const { getSubKeys } = require("./getSubKeys");

function bigIntToHex(number, padding = 16) {
  return BigInt(number).toString(16).toUpperCase().padStart(padding, "0");
}

const encrypt = (data, key, isHex = false) => {
  const keys = getSubKeys(isHex ? BigInt(`0x${key}`) : BigInt(key));
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

module.exports = { encrypt };
