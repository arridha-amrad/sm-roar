import queryClient from '@src/utils/queryClient';

const TestPage = () => {
  const setQuery = () => {
    queryClient.setQueryData(['foo'], {
      ping: 'pong',
      foo: 'foo',
    });
  };
  const removeQuery = () => {
    queryClient.removeQueries(['foo']);
  };
  return (
    <div className="m-4">
      <button onClick={setQuery} className="my-btn">
        Set Query
      </button>
      <button onClick={removeQuery} className="bg-red-500 my-btn">
        Remove Query
      </button>
    </div>
  );
};

export default TestPage;
