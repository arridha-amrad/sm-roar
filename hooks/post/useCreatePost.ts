import { axiosInstance } from '@src/utils/axiosInterceptor';
import { useMutation } from '@tanstack/react-query';

interface ICreatePostDTO {
  body: string;
}

export default function useCreatePost() {
  const { mutate, isLoading } = useMutation(
    (data: ICreatePostDTO) => {
      return axiosInstance.post('/api/post/createPost', data);
    },
    {
      onSuccess(data, variables, context) {
        console.log('Data : ', data);
      },
      onError(error, variables, context) {
        console.log('error : ', error);
      },
    }
  );

  return {
    mutate,
  };
}
