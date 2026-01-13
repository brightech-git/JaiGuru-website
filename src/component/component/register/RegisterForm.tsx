"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store/store";
import { register, verifyOtp } from "@/redux/slice/authSlice";
import { TextField, Dialog, DialogTitle, DialogContent, Typography, Box, Link as MuiLink } from "@mui/material";
import AppButton from "@/component/ui/AppButton";
import { useSnackbar } from "notistack";
import { RootState } from "@/redux/store/store";

interface RegisterFormProps {
    switchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ switchToLogin }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    // Form fields
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [roles] = useState<string[]>(["ROLE_USER"]);

    // OTP modal
    const [otp, setOtp] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [tempContactNumber, setTempContactNumber] = useState<string | null>(null);

    // Errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // ================= Register =================
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const newErrors: Record<string, string> = {};
        if (!username) newErrors.username = "Name is required";
        if (!email) newErrors.email = "Email is required";
        if (!contactNumber) newErrors.contactNumber = "Contact number is required";
        if (!password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        dispatch(register({ username, email, contactNumber, password, roles }))
            .unwrap()
            .then((res) => {
                if (res?.token) {
                    setShowOtpModal(true);
                    setTempContactNumber(contactNumber);
                    enqueueSnackbar("🎉 Registered successfully! Please verify OTP.", { variant: "success" });
                }
            })
            .catch((err: any) => {
                const message = typeof err === "string" ? err : err?.message || "Registration failed";
                enqueueSnackbar(message, { variant: "error" });
            });
    };

    // ================= Verify OTP =================
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            setErrors({ otp: "Please enter a valid 6-digit OTP" });
            return;
        }

        dispatch(verifyOtp({ contactNumber: tempContactNumber || contactNumber, otp }))
            .unwrap()
            .then(() => {
                setShowOtpModal(false);
                enqueueSnackbar("✅ OTP Verified. You can now log in.", { variant: "success" });
                switchToLogin(); // go to login tab after OTP success
            })
            .catch(() => { });
    };

    return (
        <Box sx={{ p: 1 }}>
            <Typography variant="h5" mb={{xs:1,md:2}} textAlign="center">
                Create Your Own Account Today ! 
            </Typography>

            <form onSubmit={handleRegister} className="space-y-4">
                <TextField
                    label="Full Name"
                    fullWidth
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{ mb: {xs:0.5,md:2} }}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: { xs: 0.5, md: 2 } }}
                />
                <TextField
                    label="Contact Number"
                    fullWidth
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    sx={{ mb: { xs: 0.5, md: 2 } }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{ mb: 2 }}
                />

                <AppButton
                    type="submit"
                    label={loading ? "Registering..." : "Register"}
                    appVariant="primary"
                    fontVariant="shadow"
                    fullWidth
                    disabled={loading}
                />
            </form>

            <Box  textAlign="center" mt={1} display={"flex"} justifyContent="center" alignItems="center" gap={1}>
                <Typography variant="body2"  textAlign="center">
              
                Already have an account?{" "}
                </Typography>
                <MuiLink component="button" onClick={switchToLogin} underline="hover" sx={{ cursor: "pointer" ,fontWeight:600 }} >
                    Login
                </MuiLink>
            </Box>

            {/* OTP Modal */}
            <Dialog open={showOtpModal} onClose={() => setShowOtpModal(false)}>
                <DialogTitle>Verify OTP</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleVerifyOtp} className="space-y-4 mt-2">
                        <TextField
                            label="Enter 6-digit OTP"
                            fullWidth
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            error={!!errors.otp}
                            helperText={errors.otp}
                        />
                        <AppButton
                            type="submit"
                            label={loading ? "Verifying..." : "Verify OTP"}
                            appVariant="success"
                            fontVariant="shadow"
                            fullWidth
                            disabled={loading}
                        />
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default RegisterForm;
