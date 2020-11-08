const NumbersAndLetters = [];

for (let i = 0; i <= 10; i++) {
  NumbersAndLetters.push(i);
}

for (let i = 65; i <= 90; i++) {
  NumbersAndLetters.push(String.fromCharCode(i));
}

for (let i = 97; i <= 122; i++) {
  NumbersAndLetters.push(String.fromCharCode(i));
}

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
      power %= mod;
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
