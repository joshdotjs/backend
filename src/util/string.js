"use strict";
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
    // padZero(7)    =>   "07"
    // padZero(7, 2) =>   "07"
    // padZero(7, 3) =>  "007
    return String(n).padStart(width, '0');
}
// ==============================================
module.exports = {
    truncateString,
    truncateStringFront,
    zeroPad
};
