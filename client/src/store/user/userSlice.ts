import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";
import { registerUser } from "./thunks/registerUser";
import { loginUser } from "./thunks/loginUser";
import { logoutUser } from "./thunks/logoutUser";
import { checkAuth } from "./thunks/checkAuth";

interface State {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: State = {
    user: {} as IUser,
    isAuth: false,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message ?? "Login error";
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message ?? "Login error";
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(checkAuth.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default userSlice.reducer;
