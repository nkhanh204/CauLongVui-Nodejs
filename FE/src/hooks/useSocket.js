import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook to manage socket.io connection and real-time events.
 * @returns {Object} socket - The socket instance
 */
export const useSocket = () => {
  const socketRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    // Real-time Event Listeners
    socket.on('slot:holding', (data) => {
      console.log('Slot holding:', data);
      // Logic for local UI updates if needed (e.g., yellow badge)
    });

    socket.on('slot:released', (data) => {
      console.log('Slot released:', data);
    });

    socket.on('slot:confirmed', (data) => {
      console.log('Slot confirmed:', data);
      // Invalidate queries to refresh data
      queryClient.invalidateQueries(['courts']);
      queryClient.invalidateQueries(['bookings']);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [queryClient]);

  return socketRef.current;
};
