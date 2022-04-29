import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPokemons = createAsyncThunk(
  "pokemon/getPokemons",
  async (url) => {
    const res = await fetch(url || "https://pokeapi.co/api/v2/pokemon").then(
      (res) => res.json()
    );

    const promiseArray = await res.results.map((poke) =>
      fetch(poke.url).then((respu) => respu.json())
    );

    const res2 = await Promise.all(promiseArray);

    return {
      ...res,
      results: res2,
      concat: !!url,
    };
  }
);

export const pokeSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemon: [],
    next: null,
    status: null,
  },
  extraReducers: {
    [getPokemons.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPokemons.fulfilled]: (state, action) => {
      if (action.payload.concat) {
        state.pokemon = state.pokemon.concat(action.payload.results);
      } else {
        state.pokemon = action.payload.results;
      }
      state.status = "success";
      state.next = action.payload.next;
    },
    [getPokemons.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { setPokemonList } = pokeSlice.actions;
export default pokeSlice.reducer;
