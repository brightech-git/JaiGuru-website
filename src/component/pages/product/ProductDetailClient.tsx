"use client";

import React, { useState, useEffect } from "react";
import {
    Share,
    LocalShipping,
    Security,
    ExpandLess,
    ExpandMore,
    Diamond,
    Inventory,
} from "@mui/icons-material";
import AppButton from "@/component/ui/AppButton";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Chip,
    Rating,
    IconButton,
    useTheme,
    useMediaQuery,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Collapse,
    TableHead,
    AppBar,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import { Product } from "@/types/product";

interface ProductDetailsClientProps {
    product: Product;
}

function ElevationScroll(props: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(props.children, {
        elevation: trigger ? 4 : 0,
    } as any);
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [showPriceBreakup, setShowPriceBreakup] = useState(false);
    const [showMetalDetails, setShowMetalDetails] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById("footer");
            if (footer) {
                const footerTop = footer.getBoundingClientRect().top;
                setIsFooterVisible(footerTop <= window.innerHeight);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const jewelleryData = {
        sku: "JWL-50-GLD",
        metalType: "18K Yellow Gold",
        gemstone: "Diamond",
        weight: "2.5 grams",
        purity: "75% (18K)",
        certification: "Hallmark Certified",
        delivery: "2-3 business days",
        returnPolicy: "30-day return policy",
    };

    const priceBreakupData = [
        { component: "Silver", value: "₹1,747", discount: "₹262", finalValue: "₹1,485" },
        { component: "Total", value: "₹1,747", discount: "-", finalValue: "₹1,747" },
        { component: "GST(3%)", value: "₹52", discount: "₹7", finalValue: "₹45" },
        { component: "Grand Total", value: "₹1,799", discount: "-", finalValue: "₹1,799" },
    ];

    const featuresWithIcons = [
        { icon: <LocalShipping />, text: "Free shipping on orders over ¥1,000" },
        { icon: <Inventory />, text: "In stock - Ready to ship" },
        { icon: <Security />, text: "Lifetime warranty included" },
        { icon: <Diamond />, text: "Certified genuine diamonds" },
    ];

    const metalDetails = `Add subtle grace to your outfit with these enticing drop earrings crafted in 18 Karat Yellow Gold with a glossy finish. Cast a spell of enchantment on everyone with these stunning petite danglers. It's the perfect addition to your ethnic attire.`;

    return (
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 1, sm: 2 } }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5 }} sx={{ position: "sticky", top: 0, alignSelf: "flex-start" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <Card sx={{ mb: 2, borderRadius: 0, boxShadow: theme.custom.shadows.medium }}>
                            <CardMedia
                                component="img"
                                image={selectedImage}
                                alt={product.name}
                                sx={{ width: { xs: 250, sm: 300, md: 350, lg: 400, xl: 450 }, height: { xs: 250, sm: 300, md: 350, lg: 400, xl: 450 }, objectFit: "cover", aspectRatio: "1 / 1" }}
                            />
                        </Card>
                        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
                            {product.images.map((img, i) => (
                                <Card
                                    key={i}
                                    sx={{
                                        width: { xs: 40, sm: 40, md: 50, lg: 60 },
                                        height: { xs: 40, sm: 40, md: 50, lg: 60 },
                                        cursor: "pointer",
                                        border: selectedImage === img ? 2 : 1,
                                        borderColor: selectedImage === img ? theme.custom.colors.imageBorder : "grey.200",
                                        borderRadius: { xs: 1, md: 2, lg: 3 },
                                    }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <CardMedia component="img" image={img} alt={`Thumbnail ${i + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 ,md:6,lg:7}}>
                    <Box sx={{ pl: { md: 2 } }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
                            <Chip label={product.category} color="primary" variant="outlined" size={isMobile ? "small" : "medium"} />
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Rating value={product.rating} precision={0.5} readOnly size={isMobile ? "small" : "medium"} />
                                <Typography variant="body2" color="text.secondary">
                                    ({product.reviewCount} reviews)
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" }, lineHeight: 1.2, fontFamily: theme.typography.h3.fontFamily }}>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                            <Typography variant="h4" color="primary" fontWeight="bold" fontFamily={theme.typography.h4.fontFamily}>
                                ₹{product.price}
                            </Typography>
                            <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.secondary", fontFamily: theme.typography.h6.fontFamily }}>
                                ₹{product.discountPrice}
                            </Typography>
                            <Chip
                                label={`${Math.round((1 - product.discountPrice / product.price) * 100)}% OFF`}
                                color="success"
                                size="small"
                                sx={{ fontFamily: theme.typography.subtitle1.fontFamily }}
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, fontFamily: theme.typography.body1.fontFamily }}>
                            {product.description}
                        </Typography>
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: theme.typography.h5.fontFamily }}>
                            Key Features
                        </Typography>
                        <List dense sx={{ mb: 3 }}>
                            {product.features.map((f, i) => (
                                <ListItem key={i} sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                backgroundColor: "primary.main",
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={f} sx={{ fontFamily: theme.typography.body2.fontFamily }} />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ mb: 4 }}>
                            {featuresWithIcons.map((feature, index) => (
                                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                                        {feature.icon}
                                    </ListItemIcon>
                                    <Typography variant="body2" sx={{ fontFamily: theme.typography.body2.fontFamily }}>
                                        {feature.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 2, fontFamily: theme.typography.h5.fontFamily }}>
                    Product Details
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 4, fontFamily: theme.typography.body1.fontFamily }}>
                    Additional detailed description about the product, specifications, care instructions, and other relevant information would be displayed here.
                </Typography>
            </Box>
            <Box
                sx={{
                    mb: 2,
                    p: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: theme.custom.shadows.light,
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        p: 1,
                        borderRadius: 1,
                        transition: "background-color 0.2s",
                    }}
                    onClick={() => setShowPriceBreakup(!showPriceBreakup)}
                >
                    <Typography variant="h6" fontWeight={600} fontFamily={theme.typography.h6.fontFamily}>
                        Price Breakup
                    </Typography>
                    <Typography variant="body1" fontFamily={theme.typography.body1.fontFamily}>
                        View Details {showPriceBreakup ? <ExpandLess /> : <ExpandMore />}
                    </Typography>
                </Box>
                <Collapse in={showPriceBreakup} timeout="auto">
                    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
                        <Table sx={{ minWidth: 300 }} size={isSmallMobile ? "small" : "medium"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600, fontFamily: theme.typography.subtitle1.fontFamily }}>Component</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, fontFamily: theme.typography.subtitle1.fontFamily }}>Value</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, fontFamily: theme.typography.subtitle1.fontFamily }}>Discount</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 600, fontFamily: theme.typography.subtitle1.fontFamily }}>Final Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {priceBreakupData.map((row, index) => (
                                    <TableRow
                                        key={row.component}
                                        sx={{
                                            backgroundColor:
                                                index === priceBreakupData.length - 1
                                                    ? theme.palette.primary.light + "15"
                                                    : "inherit",
                                            "&:last-child td": { fontWeight: "bold" },
                                        }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ fontFamily: theme.typography.body1.fontFamily }}>
                                            {row.component}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontFamily: theme.typography.body1.fontFamily }}>{row.value}</TableCell>
                                        <TableCell align="right" sx={{ fontFamily: theme.typography.body1.fontFamily }}>{row.discount}</TableCell>
                                        <TableCell align="right" sx={{ fontFamily: theme.typography.body1.fontFamily }}>{row.finalValue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Collapse>
            </Box>
            <Box
                sx={{
                    mb: 4,
                    p: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: theme.custom.shadows.light,
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        p: 1,
                        borderRadius: 1,
                        transition: "background-color 0.2s",
                    }}
                    onClick={() => setShowMetalDetails(!showMetalDetails)}
                >
                    <Typography variant="h6" fontWeight={600} fontFamily={theme.typography.h6.fontFamily}>
                        Metal Details
                    </Typography>
                    <Typography variant="body1" fontFamily={theme.typography.body1.fontFamily}>
                        View Details {showMetalDetails ? <ExpandLess /> : <ExpandMore />}
                    </Typography>
                </Box>
                <Collapse in={showMetalDetails} timeout="auto">
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom fontFamily={theme.typography.subtitle1.fontFamily}>
                            GENERAL DETAILS
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8, color: "text.secondary", mb: 3, fontFamily: theme.typography.body1.fontFamily }}>
                            {metalDetails}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    Metal Purity
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.purity}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    Certification
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.certification}</Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    SKU ID
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.sku}</Typography>
                            </Grid>
                            <Grid size={{xs:12 , sm:6}}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    Weight
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.weight}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
            </Box>
            {!isMobile && (
                <ElevationScroll>
                    <Box sx={{display:'flex',justifyContent:'center'}}>
                    <AppBar
                        position="fixed"
                        color="inherit"
                        sx={{
                            top: "auto",
                            right: "auto",
                            left: "auto",
                            bottom: isFooterVisible ? -100 : 3,
                            transition: "bottom 0.3s ease",
                            background: theme.custom.colors.addtoCart,
                            boxShadow: theme.custom.shadows.heavy,
                            borderRadius: 2,
                            zIndex: 1000,
                            width:{xs:'100%',sm:'80%',md:'70%',lg:"60%"},

                        }}
                    >
                        <Toolbar sx={{ justifyContent: "space-between", padding: "8px 16px", }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="h6" fontFamily={theme.typography.h6.fontFamily}>
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>
                                    Weight: {product.features.find(f => f.startsWith("Weight:"))?.split(": ")[1]}
                                </Typography>
                            </Box>
                            <AppButton
                                label="Add to Cart"
                                appVariant="primary"
                                fontVariant="creepster"
                                sx={{fontSize: theme.custom.fontSize?.larger }}
                            />
                        </Toolbar>
                    </AppBar>
                    </Box>
                </ElevationScroll>
            )}
            {isMobile && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: isFooterVisible ? -100 : 0,
                        left: 0,
                        right: 0,
                        backgroundColor: theme.custom.colors.cartBackground,
                        boxShadow: theme.custom.shadows.medium,
                        zIndex: 1000,
                        transition: "bottom 0.3s ease",
                        padding: 1,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <AppButton
                            label="Add to Cart"
                            appVariant="primary"
                            fontVariant="creepster"
                            sx={{ flex: 1, fontSize: theme.custom.fontSize?.medium }}
                        />
                        <AppButton
                            label="Buy Now"
                            appVariant="secondary"
                            fontVariant="creepster"
                            sx={{ flex: 1, fontSize: theme.custom.fontSize?.medium }}
                        />
                    </Box>
                </Box>
            )}
            <Box id="footer" sx={{ height: 0, backgroundColor: theme.custom.colors.footer, mt: 0 }} />
        </Container>
    );
}