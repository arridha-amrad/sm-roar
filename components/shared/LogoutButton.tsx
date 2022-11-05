import useLogout from '@src/hooks/user/useLogout';

const LogoutButton = () => {
  const { mutate } = useLogout();

  const logout = () => {
    mutate();
  };

  return (
    <button onClick={logout} className="my-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
