import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import PokemonList from "./pokemons.js";
import "./App.css";
import Details from "./Details";
import Type from "./type.js";
import Login from "./components/Login.js";
import { useSelector } from "react-redux";
import { selectUser, logout } from "./features/userSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <div className="App">
      {user ? (
        <BrowserRouter>
          <header className="head">
            <Link to={"/"} className="logo">
              <h1 className="head-logo" />
            </Link>
            <div className="logout">
              <a className="profile" href="/">{user.username}</a>
              <button className="bttn-logout" onClick={(e) => handleLogout(e)}>
                Cerrar sesion
              </button>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="type/:name" element={<Type />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
