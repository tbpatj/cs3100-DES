const { testC0D0 } = require("./src/tests/c0-d0");
const { testP1Permutation } = require("./src/tests/permutation-test");

function runTests() {
  //permutation test
  let p = testP1Permutation();
  //split the key into two 28-bit halves
  let { c0, d0 } = testC0D0(p);
}

runTests();
