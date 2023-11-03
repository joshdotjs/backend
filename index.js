require('./src/util/path'); // required() and rootPath()
const app = required('server');

// ==============================================

const server = app.listen(process.env.PORT, () => {
  // const add = require('./ts');
  // console.log('add(1, 2): ', add(1, 2));
  const str = `server.js: http://localhost:${process.env.PORT}`;
  console.cyan(str);
});

// ==============================================

// web sockets:
const { Server } = require('socket.io');
const io = new Server(server);

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
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});