import useCreateComment from '@src/hooks/post/useCreateComment';
import { Me } from '@src/hooks/user/useMe';
import ImageIcon from '@src/icons/ImageIcon';
import queryClient from '@src/utils/queryClient';
import { useState, useMemo, FormEvent, FC, useEffect } from 'react';
import Avatar from './Avatar';

interface IProps {
  postId: string;
  closeModal?: VoidFunction;
}

const CreateCommentForm: FC<IProps> = ({ postId, closeModal }) => {
  const me = queryClient.getQueryData<Me>(['me']);
  const [body, setBody] = useState('');
  const { isLoading, isSuccess, mutate } = useCreateComment();

  useEffect(() => {
    if (isSuccess) {
      setBody('');
      closeModal && closeModal();
    }
  }, [isSuccess]);

  const sum = useMemo(() => {
    return (body.match(/\n/g) ?? []).length;
  }, [body]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (body.trim() === '') return;
    mutate({
      body,
      postId,
    });
  };

  return (
    <div className="flex items-start gap-5">
      <Avatar url={me?.imageURL} />
      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <textarea
          onFocus={(e) => e.stopPropagation()}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={sum <= 3 ? 3 : sum >= 15 ? 15 : sum + 1}
          className="w-full bg-transparent border-none outline-none resize-none"
          placeholder="Write your reply"
        />
        <div className="flex items-center w-full">
          <button className="flex-1">
            <ImageIcon />
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-1 mr-0 text-sm text-white bg-yellow-600 disabled:dark:bg-yellow-300 hover:bg-yellow-700 rounded-xl"
          >
            {isLoading ? 'loading' : 'Reply'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommentForm;
