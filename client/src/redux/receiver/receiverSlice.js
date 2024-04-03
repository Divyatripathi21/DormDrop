import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentReceiver: null,
  remainingTime: 0,
};

const receiverSlice = createSlice({
  name: 'RECEIVER',
  initialState,
  reducers: {
    theReceiver: (state, action) => {
      state.currentReceiver = action.payload;
    },
  },
});

export const { theReceiver,UpdateTime} = receiverSlice.actions;

export default receiverSlice.reducer;










