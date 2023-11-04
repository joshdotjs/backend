require('./src/util/path'); // required() and rootPath()
const app = required('server');
const http_server = require('http').createServer(app);
// ==============================================

// const express_server = app.listen(process.env.PORT, () => {
const express_server = http_server.listen(process.env.PORT, () => {
  // const add = require('./ts');
  // console.log('add(1, 2): ', add(1, 2));
  if (process.env.NODE_ENV !== 'production') {
    const str = `server.js: http://localhost:${process.env.PORT}`;
    console.cyan(str);
  }
});

// ==============================================

// web sockets:
// const io = require('./src/util/socket').init(http_server);
const { initIO, getIO } = require('./src/util/socket');
initIO(http_server);
const io = getIO();

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
  
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message from frontend: ' + msg);
    io.emit('chat message', msg);
  });
});