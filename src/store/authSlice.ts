import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  uid: string;
  username: string;
  email: string;
  phone?: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  uid: "",
  username: "",
  email: "",
  phone: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      if (state !== null) {
        Object.assign(state, action.payload);
      }
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
