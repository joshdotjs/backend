require('./src/util/path'); // required() and rootPath()
const server = required('server');

server.listen(process.env.PORT, () => {
  const add = require('./ts');
  // console.log('add(1, 2): ', add(1, 2));
  console.cyan(`server.js: http://localhost:${process.env.PORT}`);
});