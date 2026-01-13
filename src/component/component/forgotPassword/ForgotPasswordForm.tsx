import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { forgotPassword, resetPassword } from "@/redux/slice/authSlice"; // create a thunk
import type { AppDispatch } from "@/redux/store/store";

interface ForgotPasswordProps {
    switchToLogin?: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({ switchToLogin }) => {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { enqueueSnackbar } = useSnackbar();

    const [contactNumber, setContactNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<1 | 2>(1); // step1: request OTP, step2: reset password
    const [newPassword, setNewPassword] = useState("");

    const handleRequestOtp = async () => {
        if (!contactNumber) {
            enqueueSnackbar("Please enter your contact number", { variant: "warning" });
            return;
        }
        try {
            await dispatch(forgotPassword(contactNumber)).unwrap();

            enqueueSnackbar("✅ OTP sent to your number", { variant: "success" });
            setStep(2);
        } catch (err: any) {
            enqueueSnackbar(err?.message || "Failed to send OTP", { variant: "error" });
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword) {
            enqueueSnackbar("Please fill in all fields", { variant: "warning" });
            return;
        }
        try {
            await dispatch(resetPassword({ contactNumber, otp, newPassword })).unwrap();
            enqueueSnackbar("✅ Password reset successful", { variant: "success" });
            switchToLogin?.(); // go back to login
        } catch (err: any) {
            enqueueSnackbar(err?.message || "Failed to reset password", { variant: "error" });
        }
    };

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: {xs:1 ,md:2} }}>
            <Typography variant="h5" textAlign="center" color={theme.palette.primary.main}>
                Forgot Password
            </Typography>

            {step === 1 ? (
                <>
                    <TextField
                        label="Contact Number"
                        fullWidth
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                    <Button fullWidth variant="contained" onClick={handleRequestOtp}>
                        Send OTP
                    </Button>
                </>
            ) : (
                <>
                    <TextField
                        label="OTP"
                        fullWidth
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button fullWidth variant="contained" onClick={handleResetPassword}>
                        Reset Password
                    </Button>
                </>
            )}

            <Button variant="text" onClick={switchToLogin}>
                Back to Login
            </Button>
        </Box>
    );
};

export default ForgotPasswordForm;
