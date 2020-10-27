const NextValue = (index, values) => {
  if (values[index] == "Z") values[index] = "a";
  else if (values[index] == "z") {
    values[index] = "A";
    NextValue(index - 1, values);
  } else values[index] = String.fromCharCode(values[index].charCodeAt(0) + 1);

  return values;
};

const UpgradeShortenLink = async (ShortenLink) => {
  let Values = ShortenLink.code.split("");

  Values = NextValue(8, Values);

  ShortenLink.code = Values.join("");

  ShortenLink.save()
    .then()
    .catch((err) => res.status(400).json("Error :" + err));
};

module.exports = UpgradeShortenLink;
