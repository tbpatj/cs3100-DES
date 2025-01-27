const { encryptionTest } = require("./src/tests/encryptionTest");
const { testShifts } = require("./src/tests/key-left-shifts");
const { knTest } = require("./src/tests/kn-test");
const { testP1Permutation } = require("./src/tests/permutation-test");
const { splitKey } = require("./src/tests/splitKey");
const { subKeyFuncTest } = require("./src/tests/subkeyFunc-test");

function runTests() {
  //permutation test
  let p = testP1Permutation();
  //split the key into two 28-bit halves
  let { c0, d0 } = splitKey(p);

  for (let i = 0; i < 16; i++) {
    //shifting
    const { c, d } = testShifts(c0, d0, i);
    if (i !== 0) knTest(c, d, i);
    c0 = c;
    d0 = d;
  }
  subKeyFuncTest();
  encryptionTest();
}

runTests();
