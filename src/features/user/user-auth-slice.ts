import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "firebase/auth";
import { firestoreReducer } from 'redux-firestore'

let initialState : { user: User | null} = {
    user: null
} ;


const userAuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    }
})


export const { login, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;