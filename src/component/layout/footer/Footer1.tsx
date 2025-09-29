"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Link,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { footerData } from "@/data/footerData";
import Image from "next/image";

const Footer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [email, setEmail] = useState("");

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Newsletter subscription:", email); // Replace with actual API call
        setEmail("");
    };

    const paymentIcons = [
        { name: "Visa", icon: "/icons/visa.svg" },
        { name: "Mastercard", icon: "/icons/mastercard.svg" },
        { name: "PayPal", icon: "/icons/paypal.svg" },
        { name: "Apple Pay", icon: "/icons/apple-pay.svg" },
    ];
    const contrastText = theme.palette.getContrastText(theme.custom.colors.footer);
    if (!isMobile) {
        // Desktop Footer - 4 Columns
        return (
            <Box
                sx={{
                    bgcolor: theme.custom.colors.footer,
                    color: contrastText,
                    p: { xs: 3, md: 4 },
                    boxShadow: theme.custom.shadows.light,
                }}
            >
                <Grid container spacing={3}>
                    {/* Column 1 - Logo + Social + Copyright */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ mb: 2 }}>
                            {/* <Image
                                src={footerData.company.logo}
                                alt="Logo"
                                width={120}
                                height={40}
                                style={{ filter: "brightness(1.2)" }}
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback-logo.png";
                                }}
                            /> */}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                            }}
                        >
                            {footerData.company.copyright}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 2,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                            }}
                        >
                            Powered by{" "}
                            <Link
                                href="https://www.brightechsoftware.com"
                                target="_blank"
                                sx={{
                                    color: theme.custom.colors.highlight,
                                    textDecoration: "none",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                BrightechSoftwareSolutions
                            </Link>
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
                            {footerData.company.social.map((s) => (
                                <IconButton
                                    key={s.name}
                                    component="a"
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: theme.palette.primary.contrastText,
                                        bgcolor: theme.custom.colors.subtleBlue,
                                        borderRadius: "50%",
                                        p: 0.75,
                                        "&:hover": {
                                            bgcolor: theme.palette.primary.dark,
                                            transform: "scale(1.1)",
                                        },
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {/* <Image
                                        src={s.icon}
                                        alt={s.name}
                                        width={20}
                                        height={20}
                                        onError={(e) => {
                                            e.currentTarget.src = "/fallback-icon.png";
                                        }}
                                    /> */}
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* Column 2 - Useful Links */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontFamily: theme.typography.h6.fontFamily,
                                fontSize: theme.custom.fontSize?.larger,
                                fontWeight: 600,
                            }}
                        >
                            Useful Links
                        </Typography>
                        {footerData.links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.link}
                                sx={{
                                    display: "block",
                                    color: theme.palette.primary.contrastText,
                                    mb: 0.75,
                                    fontFamily: theme.typography.body2.fontFamily,
                                    fontSize: theme.custom.fontSize?.medium,
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: theme.custom.colors.highlight,
                                        textDecoration: "underline",
                                        transform: "translateX(4px)",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </Grid>

                    {/* Column 3 - Contact */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontFamily: theme.typography.h6.fontFamily,
                                fontSize: theme.custom.fontSize?.larger,
                                fontWeight: 600,
                            }}
                        >
                            Contact
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                            }}
                        >
                            <strong>Showroom Address:</strong> Tiruvallur Showroom: 712, TNHB, Kakkalur Bypass Road, Tiruvallur - 602001
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                            }}
                        >
                            <strong>Showroom Address:</strong> Tiruttani Showroom: 321/322 MaPoSi Salai, Tiruttani
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                            }}
                        >
                            <strong>Primary Contact:</strong> +91-9600972227, +91-9884808428, +91-9169161469
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                            }}
                        >
                            <Link
                                href="mailto:info@jaigurujewellers.in"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: theme.custom.colors.highlight,
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                info@jaigurujewellers.in
                            </Link>
                        </Typography>
                    </Grid>

                    {/* Column 4 - Newsletter */}
                    {/* <Grid size={{ xs: 12, md: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontFamily: theme.typography.h6.fontFamily,
                                fontSize: theme.custom.fontSize?.larger,
                                fontWeight: 600,
                            }}
                        >
                            Newsletter
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1.5,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            Subscribe to get the latest updates.
                        </Typography>
                        <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ display: "flex", gap: 1 }}>
                            <TextField
                                placeholder="Enter your email"
                                variant="outlined"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    bgcolor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: theme.custom.colors.subtleBlue },
                                        "&:hover fieldset": { borderColor: theme.palette.primary.main },
                                        "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
                                    },
                                    "& .MuiInputBase-input": {
                                        fontSize: theme.custom.fontSize?.small,
                                        color: theme.palette.text.primary,
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    bgcolor: theme.custom.colors.mainHeader,
                                    color: theme.palette.primary.contrastText,
                                    fontFamily: theme.typography.button.fontFamily,
                                    fontSize: theme.custom.fontSize?.small,
                                    borderRadius: theme.shape.borderRadius,
                                    "&:hover": {
                                        bgcolor: theme.palette.primary.dark,
                                        transform: "translateY(-1px)",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid> */}
                </Grid>

                {/* Footer Bottom - Social Icons and Payment Methods */}
               
            </Box>
        );
    } else {
        // Mobile Footer - Accordions
        return (
            <Box
                sx={{
                    bgcolor: theme.custom.colors.footer,
                    color: theme.palette.primary.contrastText,
                    p: { xs: 2, sm: 3 },
                    boxShadow: theme.custom.shadows.light,
                }}
            >
                {/* Company */}
                <Accordion
                    sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                        border: `1px solid ${theme.custom.colors.subtleBlue}`,
                        mb: 1,
                        borderRadius: theme.shape.borderRadius,
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                        sx={{ py: 0.5 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: theme.typography.h6.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                                fontWeight: 600,
                            }}
                        >
                            Company
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                        <Box sx={{ mb: 1.5 }}>
                            {/* <Image
                                src={footerData.company.logo}
                                alt="Logo"
                                width={100}
                                height={32}
                                style={{ filter: "brightness(1.2)" }}
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback-logo.png";
                                }}
                            /> */}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            {footerData.company.copyright}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            Powered by{" "}
                            <Link
                                href="https://www.brightechsoftware.com"
                                target="_blank"
                                sx={{
                                    color: theme.custom.colors.highlight,
                                    textDecoration: "none",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                BrightechSoftwareSolutions
                            </Link>
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1.5, mt: 1.5 }}>
                            {footerData.company.social.map((s) => (
                                <IconButton
                                    key={s.name}
                                    component="a"
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: theme.palette.primary.contrastText,
                                        bgcolor: theme.custom.colors.subtleBlue,
                                        borderRadius: "50%",
                                        p: 0.75,
                                        "&:hover": {
                                            bgcolor: theme.palette.primary.dark,
                                            transform: "scale(1.1)",
                                        },
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    {/* <Image
                                        src={s.icon}
                                        alt={s.name}
                                        width={20}
                                        height={20}
                                        onError={(e) => {
                                            e.currentTarget.src = "/fallback-icon.png";
                                        }}
                                    /> */}
                                </IconButton>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Useful Links */}
                <Accordion
                    sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                        border: `1px solid ${theme.custom.colors.subtleBlue}`,
                        mb: 1,
                        borderRadius: theme.shape.borderRadius,
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                        sx={{ py: 0.5 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: theme.typography.h6.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                                fontWeight: 600,
                            }}
                        >
                            Useful Links
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                        {footerData.links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.link}
                                sx={{
                                    display: "block",
                                    color: theme.palette.primary.contrastText,
                                    mb: 0.75,
                                    fontFamily: theme.typography.body2.fontFamily,
                                    fontSize: theme.custom.fontSize?.small,
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: theme.custom.colors.highlight,
                                        textDecoration: "underline",
                                        transform: "translateX(4px)",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </AccordionDetails>
                </Accordion>

                {/* Contact */}
                <Accordion
                    sx={{
                        bgcolor: "transparent",
                        boxShadow: "none",
                        border: `1px solid ${theme.custom.colors.subtleBlue}`,
                        borderRadius: theme.shape.borderRadius,
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                        sx={{ py: 0.5 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: theme.typography.h6.fontFamily,
                                fontSize: theme.custom.fontSize?.medium,
                                fontWeight: 600,
                            }}
                        >
                            Contact
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            <strong>Showroom Address:</strong> Tiruvallur Showroom: 712, TNHB, Kakkalur Bypass Road, Tiruvallur - 602001
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            <strong>Showroom Address:</strong> Tiruttani Showroom: 321/322 Ma Po Si Salai, Tiruttani
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            <strong>Primary Contact:</strong> +91-9600972227, +91-9884808428, +91-9169161469
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 0.75,
                                fontFamily: theme.typography.body2.fontFamily,
                                fontSize: theme.custom.fontSize?.small,
                            }}
                        >
                            <Link
                                href="mailto:info@jaigurujewellers.in"
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: theme.custom.colors.highlight,
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                info@jaigurujewellers.in
                            </Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Footer Bottom - Social Icons and Payment Methods */}
                <Box
                    sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: `1px solid ${theme.custom.colors.subtleBlue}`,
                        textAlign: "center",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mb: 2 }}>
                        {paymentIcons.map((method) => (
                            <IconButton
                                key={method.name}
                                sx={{
                                    bgcolor: theme.custom.colors.subtleBlue,
                                    color: theme.palette.primary.contrastText,
                                    "&:hover": { bgcolor: theme.palette.primary.dark },
                                }}
                            >
                                {/* <Image
                                    src={method.icon}
                                    alt={method.name}
                                    width={24}
                                    height={24}
                                    onError={(e) => {
                                        e.currentTarget.src = "/fallback-icon.png";
                                    }}
                                /> */}
                            </IconButton>
                        ))}
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default Footer;