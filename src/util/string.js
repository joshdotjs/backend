exports.truncateString = ({ str, len = 6 }) => {
  if (str.length > len)
    return str.substring(0, len) + "...";
  else
    return str;
}

// ==============================================

exports.truncateStringFront = ({ str, len = 6 }) => {
  if (str.length > len)
    return "..." + str.substring(str.length - len, str.length);
  else
    return str;
}

// ==============================================

exports.zeroPad = (n, width = 2) => {
  // zeroPad(7)    =>   "07"
  // zeroPad(7, 2) =>   "07"
  // zeroPad(7, 3) =>  "007
  return String(n).padStart(width, '0');
}

// ==============================================

exports.removeWhitespace = (inputString) => {
  // Remove whitespace using a regular expression
  const no_whitespace = inputString.replace(/\s/g, '');
  return no_whitespace
}

// ==============================================

exports.lowercase = (inputString) => {
  // Convert the string to lowercase
  const lowercase = stringWithoutWhitespace.toLowerCase();
  return lowercase;
}

// ==============================================