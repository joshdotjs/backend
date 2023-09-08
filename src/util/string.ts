
type args = { str: string, len: number };
function truncateString({ str, len=6 }: args) {
  if (str.length > len) {
    return str.substring(0, len) + "...";
  } else {
    return str;
  }
}

// ==============================================

function truncateStringFront({ str, len=6 }: args) {

  console.log('str: ', str);

  if (str.length > len) {
    return "..." + str.substring(str.length - len, str.length);
  } else {
    return str;
  }
}

// ==============================================

module.exports = { 
  truncateString,
  truncateStringFront,
};