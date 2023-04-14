import { RootState } from "..";

export const selectUserError = (state: RootState) => state.user.error;