import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged, User } from "firebase/auth";
import { firestoreReducer } from "redux-firestore";
import { auth } from "../../api/firebase";
import { RootState } from "../../app/store";

enum StatusLike {
  idle = "idle",
  loading = "loading",
  success = "success",
  failed = "failed",
}

type ModifiedUserProp = Pick<
  User,
  | "displayName"
  | "email"
  | "emailVerified"
  | "photoURL"
  | "phoneNumber"
  | "uid"
  | "providerId"
>;
interface UserProps {
  user: ModifiedUserProp | null;
  status: keyof typeof StatusLike;
  error: string | undefined;
}

let initialState: UserProps = {
  user: null,
  status: "idle",
  error: undefined,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return new Promise<ModifiedUserProp>((resolve) => {
    let unsub = onAuthStateChanged(auth, (currentUser) => {
      resolve(currentUser as ModifiedUserProp);
      unsub();
    });
  });
});

const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
