const { v4 } = require('uuid');

const uuid = () => {
  const full = v4();
  const split = full.split('-');
  const end = split.at(-1);
  return end;
};


module.exports = {
  uuid
};