function get(obj, key) {
  return key.split(".").reduce(function (o, x) {
    return o === undefined || o === null ? o : o[x];
  }, obj);
}

function valueByString(obj, string, devider) {
  if (devider === undefined) {
    devider = "|";
  }
  console.log(string);
  return string
    .split(devider)
    .map(function (key) {
      return get(obj, key);
    })
    .join(" ");
}

export default valueByString;
