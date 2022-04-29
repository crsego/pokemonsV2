import { useDispatch } from "react-redux";
import { logout } from "./features/userSlice.js";
function Logout() {
  const dispatch = useDispatch;

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }
  return (
    <div>
      <button className="bttn-logout" onClick={(e) => handleLogout(e)}>
        Cerrar sesion
      </button>
    </div>
  );
}

export default Logout;
