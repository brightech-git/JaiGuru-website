// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    enqueueSnackbar: undefined 
                },
            },
        }),
});

// ✅ Types for later usage
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkExtra = typeof store.dispatch;
