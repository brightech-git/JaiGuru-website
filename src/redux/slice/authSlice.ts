// src/redux/slices/authSlice.ts
"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, verifyOtpService, User, AuthResponse } from "@/service/authService";
import { SnackbarKey, OptionsObject } from "notistack";

// ================== Types ==================
interface LoginPayload {
    contactOrEmailOrUsername?: string;
    password: string;
}
interface RegisterPayload {
    username: string;
    email: string;
    contactNumber: string;
    password: string;
    roles: string[];
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface ThunkExtra {
    enqueueSnackbar?: (message: string, options?: OptionsObject) => SnackbarKey;
}

// ================== Initial State ==================
const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// ================== Async Thunks ==================

// Login
export const login = createAsyncThunk<
    AuthResponse,
    LoginPayload,
    { extra: ThunkExtra }
>("auth/login", async (loginData, thunkAPI) => {
    const { enqueueSnackbar } = thunkAPI.extra || {};
    try {
        const response = await loginUser(loginData);

        localStorage.setItem("user", JSON.stringify(response));
        if (response.token) localStorage.setItem("user_token", response.token);

        enqueueSnackbar?.("✅ Login successful!", { variant: "success" });
        return response;
    } catch (error: any) {
        enqueueSnackbar?.(error.message || "Login failed", { variant: "error" });
        return thunkAPI.rejectWithValue(error.message);
    }
});


// Register
export const register = createAsyncThunk<AuthResponse, RegisterPayload, { extra: ThunkExtra }>(
    "auth/register",
    async (userData, thunkAPI) => {
        const { enqueueSnackbar } = thunkAPI.extra || {};
        try {
            const response = await registerUser(userData);
            console.log("Register response:", response);

            // if backend returns an error in response
            if (response?.message) {
                enqueueSnackbar?.(response.message, { variant: "error" });
                return thunkAPI.rejectWithValue(response.message);
            }

            enqueueSnackbar?.("🎉 Registered successfully! Please verify OTP.", { variant: "success" });
            return response;
        } catch (error: any) {
            enqueueSnackbar?.(error.message || "Registration failed", { variant: "error" });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// Verify OTP
export const verifyOtp = createAsyncThunk<User, { contactNumber: string; otp: string }, { extra: ThunkExtra }>(
    "auth/verifyOtp",
    async ({ contactNumber, otp }, thunkAPI) => {
        const { enqueueSnackbar } = thunkAPI.extra || {};
        try {
            const response = await verifyOtpService(contactNumber, otp);
            if (!response.user || !response.token) throw new Error("Invalid OTP verification response");

            localStorage.setItem("user", JSON.stringify(response.user));
            localStorage.setItem("user_token", response.token);

            enqueueSnackbar?.("✅ OTP verified successfully!", { variant: "success" });
            return response.user;
        } catch (error: any) {
            enqueueSnackbar?.(error.message || "OTP verification failed", { variant: "error" });
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ================== Slice ==================
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("user_token");
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.loading = false;
                const { user, token } = action.payload;
                state.user = user
                    ? {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        contactNumber: user.contactNumber,
                        token: token,
                    }
                    : null;
                state.token = token || null;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Register
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Verify OTP
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.token = localStorage.getItem("user_token");
            })
            .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
