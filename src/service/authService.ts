// src/services/authService.ts
import PublicUrl from "../api/publicUrl";

// ---------- Types ----------
export interface User {
    id: string;
    name: string;
    email: string;
    contactNumber: string;
    [key: string]: any; // optional extra fields
}

export interface AuthResponse {
    message?: string;
    user?: User;
    token?: string;
    error?: string;
    status?: string;
}
export interface LoginPayload {
    contactOrEmailOrUsername?: string;
    password: string;
}

// ---------- Register ----------
export const registerUser = async (
    userData: Record<string, any>
): Promise<AuthResponse> => {
    const response = await PublicUrl.post<AuthResponse>("auth/user/register", userData);
    return response.data;
};

// ---------- Login ----------


export const loginUser = async (
    loginData: LoginPayload
): Promise<AuthResponse> => {
    // Make sure at least one identifier is provided
    if (!loginData.contactOrEmailOrUsername ) {
        throw new Error("Please provide name, email, or contact number to login.");
    }

    const response = await PublicUrl.post<AuthResponse>(
        "auth/user/login",
        loginData
    );
    const data = response.data;

    if (data.status === "error" || data.error) {
        throw new Error(data.message || data.error || "Login failed");
    }

    if (!data.token) {
        throw new Error("No token received. Please try again.");
    }

    return data;
};
// ---------- Verify OTP ----------
export const verifyOtpService = async (
    contactNumber: string,
    otp: string
): Promise<AuthResponse> => {
    const response = await PublicUrl.post<AuthResponse>(
        `auth/user/verify-otp?contactNumber=${contactNumber}&otp=${otp}`
    );

    const data = response.data;

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
};

// ---------- Forgot Password ----------
export const forgotPasswordService = async (
    contactNumber: string
): Promise<AuthResponse> => {
    const response = await PublicUrl.post<AuthResponse>("auth/user/forgot-password", {
        contactNumber,
    });

    const data = response.data;

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
};

// ---------- Reset Password ----------
export const resetPasswordService = async (params: {
    contactNumber: string;
    otp: string;
    newPassword: string;
}): Promise<AuthResponse> => {
    const response = await PublicUrl.post<AuthResponse>("auth/user/reset-password", params);

    const data = response.data;

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
};

// ---------- Change Password ----------
export const changePasswordService = async (params: {
    oldPassword: string;
    newPassword: string;
}): Promise<AuthResponse> => {
    const token = localStorage.getItem("user_token");

    if (!token) {
        throw new Error("No token found. Please login again.");
    }

    try {
        const response = await PublicUrl.post<AuthResponse>(
            "/user/change-password",
            params
        );

        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || error.message || "Failed to change password"
        );
    }
};

// ---------- Google Login ----------
export const googleLoginService = async (idToken: string): Promise<AuthResponse> => {
    if (!idToken) {
        throw new Error("Google ID token is missing");
    }

    try {
        const response = await PublicUrl.post<AuthResponse>("/auth/google-login", { idToken });
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message ||
            "Google login failed"
        );
    }
};
