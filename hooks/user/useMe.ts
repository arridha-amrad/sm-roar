import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import queryClient from '@src/utils/queryClient';
import useLogout from './useLogout';

export type Me = Omit<User, 'password'>;

export default function useMe() {
  const { isSuccess: isLogoutSuccessfully } = useLogout();
  const loginUser = queryClient.getQueryData<Me>(['me']);

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => axiosInstance.get<{ user: Me }>('/api/user/me'),
    enabled: !isLogoutSuccessfully && !loginUser,
    select: ({ data }) => {
      if (data) {
        return data.user;
      }
    },
    onSuccess(user) {
      queryClient.setQueryData(['me'], user);
    },
  });

  return {
    data,
    isLoading,
  };
}
