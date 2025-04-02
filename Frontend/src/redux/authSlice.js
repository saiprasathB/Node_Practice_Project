import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        email: null,
        isAdmin: false,
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.email = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
