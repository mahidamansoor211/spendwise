import useLogout from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <div>
      <button disabled={isLoading} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
