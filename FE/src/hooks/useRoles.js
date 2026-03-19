import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as roleService from '../services/role.service';

const QUERY_KEY = ['roles'];

export const useRoles = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: roleService.getRoles,
  });
};

export const useRoleDetail = (id) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => roleService.getRoleById(id),
    enabled: !!id,
  });
};

export const useCreateRole = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: roleService.createRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      options.onSuccess?.(data);
    },
    onError: options.onError,
  });
};
