import { createSlice } from "@reduxjs/toolkit";


const users = [
  { username: "crsego", email: "cristsergo@gmail.com", password: "123456", },
  { username: "tayan", email: "adrina@hotmail.com", password: "55555", },
  {username:"juanchin12", email: "juanchito22@gmail.com", password:"juancito",},
];
  
const loggedUserJSON = window.localStorage.getItem('loggedPokedesk');

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(loggedUserJSON),
    error: null,
  },
  reducers: {
    login: (state, action) => {
      const user = users.find(({ username, email }) => {
        return username === action.payload.username || email === action.payload.username;
      });
      if (user && user.password === action.payload.password) {
        state.user = action.payload;
        state.error = null;
        window.localStorage.setItem('loggedPokedesk', JSON.stringify(user));
      } else if(user && user.password !== action.payload.password){
        state.error = "contraseña incorrecta";
      } else if(user === undefined){
        state.error = "usuario incorrecto";
        
      }     
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear(loggedUserJSON);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectError = (state)=> state.user.error;

export default userSlice.reducer;
