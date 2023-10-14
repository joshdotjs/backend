exports.truncate = ({ str, len = 6 }) => {
  if (str.length > len)
    return str.substring(0, len) + "...";
  else
    return str;
}

// ==============================================

exports.truncateFront = ({ str, len = 6 }) => {
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

exports.removeWhitespace = (str) => {
  // Remove whitespace using a regular expression
  const no_whitespace = str.replace(/\s/g, '');
  return no_whitespace
}

// ==============================================

exports.lowercase = (str) => {
  // Convert the string to lowercase
  const lowercase = str.toLowerCase();
  return lowercase;
}

// ==============================================