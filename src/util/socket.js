let io; // closure

// ==============================================

const initIO = (http_server) => {
  const { Server } = require('socket.io');
  // const io = new Server(server);
  
  io = new Server(http_server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      // origin:'*',
    },
  });
  // return io; 
};

// ==============================================

const getIO = () => {
  if(!io) throw new Error('Socket.io not initialized!');
  return io;
};

// ==============================================

module.exports = {
  initIO,
  getIO,
};