import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface storeState {
  store: {
    value: number;
    name: string;
    state: boolean;
  };
}

//
const initialState: storeState = {
  store: {
    value: 10,
    name: "Hello world",
    state: false,
  },
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    //increment
    incremented(state) {
      state.store.value++;
    },
    //decrement
    decremented(state) {
      state.store.value--;
    },

    //reset
    reset(state) {
      state.store.value = 0;
    },
    //custom.store.value
    amountAdded(state, action: PayloadAction<number>) {
      state.store.value += action.payload;
    },

    toggleState(state) {
      state.store.state = !state.store.state;
    },
  },
});

export const { incremented, decremented, amountAdded, toggleState } =
  storeSlice.actions;
export default storeSlice.reducer;
