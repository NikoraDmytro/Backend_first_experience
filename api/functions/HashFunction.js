const NumbersAndLetters = [
  "0",
  "1",
  "2",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const HashFunction = (string) => {
  const P = 31n;
  const mod = BigInt(Math.pow(2, 64) - 1);
  let hash = 0n;
  let power = 1n;
  let powerOfSixtyTwo = 1n;

  let index = 0;
  for (let i in string) {
    if (string[i] == "/" && string[i] != "/") {
      index = i + 1;
    }
  }

  for (let i in string) {
    const charSet = string.toLowerCase().charCodeAt(i);
    if (charSet >= 97 && charSet <= 122 && i > index) {
      hash += (BigInt(charSet - 97 + 1) * power) % mod;
      power *= P;
      while (hash > powerOfSixtyTwo) {
        powerOfSixtyTwo *= 62n;
      }
    }
  }

  let result = "";

  while (true) {
    while (powerOfSixtyTwo > hash) {
      powerOfSixtyTwo /= 62n;
    }
    result += NumbersAndLetters[hash / powerOfSixtyTwo - 1n];
    hash %= powerOfSixtyTwo;
    if (powerOfSixtyTwo == 1) {
      break;
    }
  }

  return result;
};

module.exports = HashFunction;
