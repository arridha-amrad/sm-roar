import { PostData } from '@src/modules/post/post.types';
import { axiosInstance } from '@src/utils/axiosInterceptor';
import queryClient from '@src/utils/queryClient';
import { useMutation } from '@tanstack/react-query';

interface ICreatePostDTO {
  body: string;
}

export default function useCreatePost() {
  // const { mutate, isLoading } = useMutation(
  //   (data: ICreatePostDTO) => {
  //     return axiosInstance.post<PostData>('/api/post/createPost', data);
  //   },
  //   {
  //     onSuccess(data, variables, context) {
  //       console.log('Data : ', data);
  //     },
  //     onError(error, variables, context) {
  //       console.log('error : ', error);
  //     },
  //   }
  // );

  const { mutate } = useMutation({
    mutationFn: async (data: ICreatePostDTO) => {
      return axiosInstance.post<PostData>('/api/post/createPost', data);
    },
    onSuccess(data, variables, context) {
      queryClient.getQueryData(['me']);
    },
  });

  return {
    mutate,
  };
}
