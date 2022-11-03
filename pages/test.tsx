import queryClient from "@src/utils/queryClient";

const TestPage = () => {
  const setQuery = () => {
    queryClient.setQueryData(["foo"], {
      ping: "pong",
      foo: "foo",
    });
  };
  const removeQuery = () => {
    queryClient.clear();
  };
  return (
    <div className="m-4">
      <button onClick={setQuery} className="my-btn">
        Set Query
      </button>
      <button onClick={removeQuery} className="my-btn bg-red-500">
        Remove Query
      </button>
    </div>
  );
};

export default TestPage;
