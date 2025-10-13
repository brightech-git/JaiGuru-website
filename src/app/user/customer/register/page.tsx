"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store/store";
import { register ,verifyOtp } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AppButton from "@/component/ui/AppButton";
import { useSnackbar } from "notistack";
import { RootState } from "@/redux/store/store";


export default function RegisterPage() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
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
                router.push("/"); // redirect after successful OTP
            })
            .catch(() => { });
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Create Your Account</h1>

            <form onSubmit={handleRegister} className="space-y-4">
                <TextField
                    label="Full Name"
                    fullWidth
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Contact Number"
                    fullWidth
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
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
        </div>
    );
}
