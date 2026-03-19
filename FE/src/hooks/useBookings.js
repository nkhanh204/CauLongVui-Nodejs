import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as bookingService from '../services/booking.service';

const QUERY_KEY = ['bookings'];

/**
 * Hook: Lấy danh sách booking.
 */
export const useBookings = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: bookingService.getBookings,
  });
};

/**
 * Hook: Lấy chi tiết booking.
 * @param {string} id
 */
export const useBookingDetail = (id) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => bookingService.getBookingById(id),
    enabled: !!id,
  });
};

/**
 * Hook: Tạo booking mới.
 * bookingDate phải đúng format YYYY-MM-DD.
 */
export const useCreateBooking = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};

/**
 * Hook: Cập nhật booking.
 */
export const useUpdateBooking = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => bookingService.updateBooking(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};

/**
 * Hook: Cập nhật trạng thái booking (Pending → Confirmed → Cancelled).
 */
export const useUpdateBookingStatus = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => bookingService.updateBookingStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};

/**
 * Hook: Xóa booking.
 */
export const useDeleteBooking = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookingService.deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.();
    },
    onError: options.onError,
  });
};
