import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  // Array of UTCString, Since Date type cannot be stored in mobile app.
  clocks: [] as string[],
};

const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    reset: () => initialState,
    setClocks(state, action: PayloadAction<string[]>) {
      state.clocks = action.payload;
    },
    addClock(state, action: PayloadAction<string>) {
      state.clocks = [...state.clocks, action.payload];
    },
    removeClock(state, action: PayloadAction<string>) {
      const newClocks = state.clocks.filter((clock) => {
        return new Date(clock).getTime() !== new Date(action.payload).getTime();
      });
      state.clocks = newClocks;
    },
  },
});

export const { reset, setClocks, addClock, removeClock } = clockSlice.actions;
export default clockSlice.reducer;
