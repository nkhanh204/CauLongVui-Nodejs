import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as userService from '../services/user.service';

const QUERY_KEY = ['users'];

/**
 * Hook: Lấy danh sách người dùng.
 */
export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: userService.getUsers,
  });
};

/**
 * Hook: Lấy chi tiết người dùng.
 * @param {string} id
 */
export const useUserDetail = (id) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
};

/**
 * Hook: Tạo người dùng mới.
 */
export const useCreateUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};

/**
 * Hook: Cập nhật người dùng.
 */
export const useUpdateUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};

/**
 * Hook: Xóa người dùng.
 */
export const useDeleteUser = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.();
    },
    onError: options.onError,
  });
};
