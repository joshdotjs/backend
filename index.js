const { required } = require('./src/util/path');
global.required = required;

// const server = require('./src/api/server');
const server = required('server');

const port = process.env.PORT;

server.listen(port, () => {
  const add = require('./ts');
  console.log('add(1, 2): ', add(1, 2));

  console.cyan(`server.js: http://localhost:${port}`);
});