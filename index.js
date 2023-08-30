require('./src/util/path');
require('./src/util/console');

const server = require('./src/api/server');

const port = process.env.PORT;

server.listen(port, () => {
  console.cyan(`server.js: http://localhost:${port}`);
});