import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/store/store-slice";
import userReducer from "../features/user/user-auth-slice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,

    // testing api fetching on middleware
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(apiSlice.middleware);
  // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
