import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as paymentService from '../services/payment.service';

const QUERY_KEY = ['payments'];

/**
 * Hook: Lấy danh sách thanh toán.
 */
export const usePayments = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: paymentService.getPayments,
  });
};

/**
 * Hook: Tạo thanh toán mới.
 */
export const useCreatePayment = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.createPayment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};

/**
 * Hook: Cập nhật trạng thái thanh toán.
 */
export const useUpdatePaymentStatus = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => paymentService.updatePaymentStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};
