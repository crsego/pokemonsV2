
import userReducer from "../features/userSlice";
import pokemonsReducer from "../features/pokeSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    pokemons: pokemonsReducer,
  }
});

export default store;