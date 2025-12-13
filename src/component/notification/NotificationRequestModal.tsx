"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery,
    SwipeableDrawer,
    Grid,
} from "@mui/material";
import {
    Bell,
    X,
    Star,
    Tag,
    CheckCircle,
    PackageCheck,
    Sparkles,
} from "lucide-react";
import { useNotification } from "@/context/notification/NotificationContext";
import { useSnackbar } from "notistack";
import AppButton from "../ui/AppButton";

// Session storage key
const NOTIFICATION_ASKED_KEY = 'tanisha_notification_asked';

const NotificationRequestModal = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { permission, requestPermission } = useNotification();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Check if we should show the notification modal
    const shouldShowNotificationModal = () => {
        // Don't show if permission is already granted or denied
        if (permission !== "default") {
            return false;
        }

        // Check session storage - don't show if already asked in this session
        const hasBeenAsked = sessionStorage.getItem(NOTIFICATION_ASKED_KEY);
        return !hasBeenAsked;
    };

    // Mark that we've asked for notification permission in this session
    const markAsAsked = () => {
        sessionStorage.setItem(NOTIFICATION_ASKED_KEY, 'true');
    };

    // Enhanced user interaction detection
    useEffect(() => {
        if (shouldShowNotificationModal()) {
            const handleUserInteraction = () => {
                setTimeout(() => {
                    if (shouldShowNotificationModal()) {
                        setOpen(true);
                        markAsAsked(); // Mark as asked when showing
                    }
                }, 1000);
                document.removeEventListener("click", handleUserInteraction);
                document.removeEventListener("scroll", handleUserInteraction);
                document.removeEventListener("keydown", handleUserInteraction);
            };

            document.addEventListener("click", handleUserInteraction);
            document.addEventListener("scroll", handleUserInteraction);
            document.addEventListener("keydown", handleUserInteraction);

            return () => {
                document.removeEventListener("click", handleUserInteraction);
                document.removeEventListener("scroll", handleUserInteraction);
                document.removeEventListener("keydown", handleUserInteraction);
            };
        }
    }, [permission]);

    const handleAllow = async () => {
        const result = await requestPermission();
        console.log("Notification permission result:", result);
        if (result) {
            enqueueSnackbar("Notifications enabled successfully! 🎉", {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "right" },
                autoHideDuration: 3000,
            });
        }
        handleClose();
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const handleMaybeLater = () => {
        // Just close, session storage already marked as asked
        handleClose();
    };

    const benefits = [
        {
            icon: <PackageCheck size={18} />,
            text: "Instant updates on your orders and deliveries",
            color: theme.palette.primary.main,
        },
        {
            icon: <Tag size={18} />,
            text: "Exclusive alerts on limited-time offers and discounts",
            color: theme.palette.secondary.main,
        },
        {
            icon: <Sparkles size={18} />,
            text: "Be the first to know about new collections and launches",
            color: theme.palette.success.main,
        },
        {
            icon: <Star size={18} />,
            text: "Get personalized recommendations and early access privileges",
            color: theme.palette.warning.main,
        },
    ];

    // Image Card Content
    const renderImageCard = () => (
        <Card
            sx={{
                height: "100%",
                background: theme.custom.colors.backgroundColor,
                borderRadius: isMobile ? "12px" : "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: isMobile ? 3 : 4,
                position: "relative",
                overflow: "hidden",
                mb: isMobile ? 2 : 0,
            }}
        >
            {/* Background Pattern */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.light}20 0%, transparent 50%)`,
                }}
            />

            {/* Content */}
            <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Box
                    sx={{
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        p: isMobile ? 2 : 3,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                    }}
                >
                    <Bell size={isMobile ? 32 : 48} color="white" />
                </Box>

                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                        color: "white",
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: theme.custom.fonts.domine,
                    }}
                >
                    Welcome to VRAJewels!
                </Typography>

                <Typography
                    variant={isMobile ? "body1" : "h6"}
                    sx={{
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 500,
                        mb: 2,
                    }}
                >
                    Luxury Awaits You
                </Typography>

                {/* Special Offer Badge */}
                <Card
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                        color: "white",
                        borderRadius: "12px",
                        p: isMobile ? 1.5 : 2,
                        mt: 1,
                    }}
                >
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        $500 OFF
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 500,
                            opacity: 0.9,
                        }}
                    >
                        On your first order
                    </Typography>
                </Card>
            </Box>
        </Card>
    );

    // Benefits Card Content
    const renderBenefitsCard = () => (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <Box sx={{ mb: isMobile ? 2 : 1 }}>
                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        mb: 0.5,
                        fontFamily: theme.custom.fonts.domine,
                    }}
                >
                    Stay Connected
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                    }}
                >
                    Enable notifications to unlock exclusive benefits
                </Typography>
            </Box>

            {/* Benefits List */}
            <List
                dense
                sx={{
                    mb: 1,
                    flex: 1,
                    overflow: 'auto',
                }}
            >
                {benefits.map((benefit, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 44 }}>
                            <Box
                                sx={{
                                    color: benefit.color,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 32,
                                    height: 32,
                                    borderRadius: "10px",
                                    background: `${benefit.color}15`,
                                }}
                            >
                                {benefit.icon}
                            </Box>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        fontSize: theme.custom.fontSize?.medium,
                                    }}
                                >
                                    {benefit.text}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // Common content for both modal and drawer
    const renderContent = () => (
        <>
            {/* Header with close button - Only for mobile */}
            {isMobile && (
                <Box
                    sx={{
                        background: `linear-gradient(135deg, #d4af37 0%, #b8860b 100%)`,
                        color: "white",
                        position: "relative",
                        flexShrink: 0,
                    }}
                >
                    <DialogTitle
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            pb: 2,
                            px: 2,
                            pt: 2,
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Bell size={24} color="white" />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Welcome to VRAJewels!
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleMaybeLater}
                            sx={{
                                color: "white",
                                background: "rgba(255,255,255,0.1)",
                                "&:hover": {
                                    background: "rgba(255,255,255,0.2)",
                                },
                            }}
                            size="small"
                        >
                            <X size={18} />
                        </IconButton>
                    </DialogTitle>
                </Box>
            )}

            <DialogContent
                sx={{
                    p: 0,
                    height: isMobile ? "auto" : "500px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {isMobile ? (
                    // Mobile Layout - Single column with scroll
                    <Box
                        sx={{
                            p: 1,
                            flex: 1,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Image Card for Mobile */}
                        {renderImageCard()}

                        {/* Benefits Card for Mobile */}
                        <Box sx={{ flex: 1, minHeight: 0 }}>
                            {renderBenefitsCard()}
                        </Box>
                    </Box>
                ) : (
                    // Desktop Layout - Split screen
                    <Grid container sx={{ height: "100%" }}>
                        <Grid size={{xs:6}}>
                            {renderImageCard()}
                        </Grid>
                            <Grid size={{ xs: 6 }}>
                            <Box sx={{
                                p: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                {renderBenefitsCard()}
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>

            {/* Actions */}
            <Divider />
            <DialogActions
                sx={{
                    p: isMobile ? 1 : 2,
                    gap: {xs:1,sm:2},
                    flexShrink: 0,
                    ...(isMobile && {
                        flexDirection: "row",
                        "& > *": {
                            width: "100%",
                            mx: 0,
                        },
                    }),
                }}
            >
                <AppButton
                    label="Maybe Later"
                    appVariant="ghost"
                    fontVariant="poiret"
                    startIcon={<X size={16} />}
                    onClick={handleMaybeLater}
                    sx={{
                        borderRadius: "12px",
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        borderColor: theme.palette.divider,
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            borderColor: theme.palette.text.secondary,
                            background: theme.palette.action.hover,
                        },
                    }}
                />

                <AppButton
                    label="Enable Notifications"
                    appVariant="primary"
                    fontVariant="poiret"
                    startIcon={<CheckCircle size={16} />}
                    onClick={handleAllow}
                    sx={{
                        borderRadius: "12px",
                        px: 2,
                        py: 1,
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        boxShadow: theme.custom.shadows.medium,
                        "&:hover": {
                            boxShadow: theme.custom.shadows.heavy,
                            transform: "translateY(-1px)",
                        },
                        transition: "all 0.2s ease",
                    }}
                />
            </DialogActions>
        </>
    );

    // Mobile Drawer
    if (isMobile) {
        return (
            <SwipeableDrawer
                anchor="bottom"
                open={open && !isClosing}
                onClose={handleMaybeLater}
                onOpen={() => setOpen(true)}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: '70vh',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
                PaperProps={{
                    component: motion.div,
                    initial: { y: '100%' },
                    animate: {
                        y: 0,
                        transition: {
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }
                    },
                    exit: {
                        y: '100%',
                        transition: { duration: 0.3 }
                    },
                }}
            >
                {renderContent()}
            </SwipeableDrawer>
        );
    }

    // Desktop Modal
    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    open={open && !isClosing}
                    onClose={handleMaybeLater}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{
                        component: motion.div,
                        initial: { scale: 0.8, opacity: 0, y: 20 },
                        animate: {
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            }
                        },
                        exit: {
                            scale: 0.9,
                            opacity: 0,
                            transition: { duration: 0.2 }
                        },
                        style: {
                            borderRadius: "20px",
                            background: theme.palette.background.paper,
                            boxShadow: theme.custom.shadows.heavy,
                            overflow: "hidden",
                            maxWidth: "800px",
                        },
                    }}
                >
                    {/* Close button for desktop */}
                    <IconButton
                        onClick={handleMaybeLater}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            zIndex: 10,
                            background: "rgba(0,0,0,0.1)",
                            "&:hover": {
                                background: "rgba(0,0,0,0.2)",
                            },
                        }}
                        size="small"
                    >
                        <X size={18} />
                    </IconButton>

                    {renderContent()}
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default NotificationRequestModal;