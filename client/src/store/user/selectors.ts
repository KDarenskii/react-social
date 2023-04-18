import { RootState } from "..";

export const selectUserError = (state: RootState) => state.user.error;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
