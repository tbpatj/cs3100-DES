// Add color helper functions
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  bgYellow: "\x1b[43m",
};

const highlight = (text, color) => {
  return `${colors[color]}${text}${colors["reset"]}`;
};

const bitsWHighlight = (num, highlightBits = [], padding = 64) => {
  const str = num.toString(2).padStart(padding, "0");
  let readOut = "";
  if (typeof highlightBits === "object") {
    let split = str.split("");
    for (let i = 0; i < split.length; i++) {
      readOut += highlightBits.includes(padding - i)
        ? highlight(split[i], "bgYellow")
        : split[i];
    }
  } else if (typeof highlightBits === "number") {
    let split = str.split("");
    for (let i = 0; i < split.length; i++) {
      readOut +=
        i === padding - highlightBits
          ? highlight(split[i], "bgYellow")
          : split[i];
    }
  }
  return readOut;
};

const highlightBitsAtIndex = (num, index, padding = 64) => {
  const str = num.toString(2).padStart(padding, "0");
  let readOut = "";
  if (typeof index === "number") {
    for (let i = 0; i < str.length; i++) {
      readOut += i === index ? highlight(str[i], "bgYellow") : str[i];
    }
  } else {
    for (let i = 0; i < str.length; i++) {
      readOut += index.includes(i) ? highlight(str[i], "bgYellow") : str[i];
    }
  }
  return readOut;
};

module.exports = { bitsWHighlight, highlight, highlightBitsAtIndex };
