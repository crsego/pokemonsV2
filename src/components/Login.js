import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectError } from "../features/userSlice";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const dispatch = useDispatch();

  const error = useSelector(selectError);

  const validacion = ()=>{
    if(error){
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        username: username,
        password: password,
        error: error,
      })
    );
  };
  return (
    <div className="login">
      <h1 className="login-title">Iniciar sesion</h1>
      <div>
        <form className="form-login" onSubmit={(e) => handleSubmit(e)}>
          <label className="username">
            <span>Correo o Usuario</span>
            <input
              className="userInput"
              value={username}
              name="username"
              onChange={handleChange} 
              aria-required="true"
              autoCorrect="off"
              placeholder="username"
              onBlur={validacion}
            />
          </label>
          <label className="password">
            <span>Contraseña</span>
            <input
              className="userInput"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              aria-required="true"
              autoCorrect="off"
              placeholder="password"
              onBlur={validacion}
            />
          </label>
          <button type="submit" className="bttn-login">
            Iniciar sesion
          </button>
          {error && <div className="error">{error}</div>}
          <a href="/" className="forgot">
            olvido su Contraseña?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
