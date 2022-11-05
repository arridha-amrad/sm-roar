import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import queryClient from '@src/utils/queryClient';

export interface MeResponse {
  user: Me;
}

export type Me = Omit<User, 'password'>;

export default function useMe(isEnabled: boolean) {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => axiosInstance.get<MeResponse>('/api/user/me'),
    enabled: isEnabled,
    onSuccess({ data }) {
      queryClient.setQueryData(['me'], data.user);
    },
  });

  return {
    data,
    isLoading,
  };
}
