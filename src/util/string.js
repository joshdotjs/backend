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
module.exports = {
    truncateString,
    truncateStringFront,
};
