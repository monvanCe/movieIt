import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AuthState {
  currentUser: IUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: state => {
      state.currentUser = null;
    },
  },
});

export const {setCurrentUser, clearCurrentUser} = authSlice.actions;
export default authSlice.reducer;
