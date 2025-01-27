const { printAllBits } = require("./src/bit-operations");
const { encrypt } = require("./src/encrypt");

function main() {
  // Get command line arguments
  const args = process.argv.slice(2);

  let m = "0123456789ABCDEF";
  let k = "133457799BBCDFF1";
  // Check if arguments provided
  if (args.length < 2) {
    console.error("Usage: node index.js <message> <key>");
    process.exit(1);
  } else {
    m = args[0];
    k = args[1];
  }
  const c = encrypt(m, k, true);
  console.log("m:", m);
  console.log("k:", k);
  console.log("c:", c);
}

main();
