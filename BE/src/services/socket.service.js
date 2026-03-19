let io;

/**
 * Initialize Socket.io
 * @param {Object} socketIoInstance 
 */
const init = (socketIoInstance) => {
  io = socketIoInstance;
  
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('join_court', (courtId) => {
      socket.join(courtId);
      console.log(`User ${socket.id} joined court room: ${courtId}`);
    });

    socket.on('slot:hold', (data) => {
      // Broadcast to others in the same court room
      socket.to(data.courtId).emit('slot:holding', {
        slotId: data.slotId,
        bookingDate: data.bookingDate,
        userId: socket.id
      });
    });

    socket.on('slot:unhold', (data) => {
      socket.to(data.courtId).emit('slot:released', {
        slotId: data.slotId,
        bookingDate: data.bookingDate,
        userId: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

/**
 * Get Socket.io instance
 * @returns {Object}
 */
const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

/**
 * Emit event to a specific court room
 * @param {string} courtId 
 * @param {string} event 
 * @param {Object} data 
 */
const emitToCourt = (courtId, event, data) => {
  if (io) {
    io.to(courtId).emit(event, data);
  }
};

module.exports = {
  init,
  getIO,
  emitToCourt,
};
