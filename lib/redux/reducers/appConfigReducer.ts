import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  isFirstTimeUser: true as boolean,
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsFirstTimeUser(state, action: PayloadAction<boolean>) {
      state.isFirstTimeUser = action.payload;
    },
  },
});

export const { reset, setIsFirstTimeUser } = appConfigSlice.actions;
export default appConfigSlice.reducer;
