function truncateString({ str, len = 6 }) {
  if (str.length > len) {
    return str.substring(0, len) + "...";
  }
  else {
    return str;
  }
}

// ==============================================

function truncateStringFront({ str, len = 6 }) {
  if (str.length > len) {
    return "..." + str.substring(str.length - len, str.length);
  }
  else {
    return str;
  }
}

// ==============================================

function zeroPad(n, width = 2) {
  // zeroPad(7)    =>   "07"
  // zeroPad(7, 2) =>   "07"
  // zeroPad(7, 3) =>  "007
  return String(n).padStart(width, '0');
}

// ==============================================

function removeWhitespaceAndMakeLowercase(inputString) {
  // Remove whitespace using a regular expression
  const stringWithoutWhitespace = inputString.replace(/\s/g, '');

  // Convert the string to lowercase
  const lowercaseString = stringWithoutWhitespace.toLowerCase();

  return lowercaseString;
}

// ==============================================

module.exports = {
  truncateString,
  truncateStringFront,
  zeroPad
};
