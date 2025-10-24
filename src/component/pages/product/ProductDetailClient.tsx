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
    Stack
} from "@mui/material";
import { Product } from "@/types/product";
import DynamicBreadcrumbs from "@/component/layout/breadcrumb/DynamicBreadcrumbs";
import { useCompanyName } from "@/context/name/companyNameContext";
import Image from "next/image";
import BrandAssurance from "@/component/layout/BrandAssurance";

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
    const [showPriceBreakup, setShowPriceBreakup] = useState(true);
    const [showMetalDetails, setShowMetalDetails] = useState(true);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const companyName = useCompanyName();

    const logo = companyName?.company?.logo || "/images/2.webp";
    const title = companyName?.company?.name || "VRAjewels";
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
            {isMobile  && <DynamicBreadcrumbs />}

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
                        {!isMobile && <DynamicBreadcrumbs />}
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
                            <Stack direction="row" spacing={1} flexWrap="wrap" >
                                {product.badges.map((badge, idx) => (
                                    <Chip
                                        key={idx}
                                        label={badge}
                                        color={
                                            badge === "Featured" ? "primary" :
                                                badge === "Best Design" ? "secondary" :
                                                    "success"
                                        }
                                        size={isMobile ? "small" : "medium"}
                                    />
                                ))}
                            </Stack>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Rating value={product.rating} precision={0.5} readOnly size={isMobile ? "small" : "medium"} />
                                <Typography variant="body2" color="text.secondary">
                                    ({product.reviewCount} reviews)
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h3" color="secondary" sx={{ fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.2rem", md: "1.5rem" }, lineHeight: 1.2, fontFamily: theme.typography.h4.fontFamily }}>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" } }} >
                            <Typography variant="h4" color="primary" fontWeight="bold" fontFamily={theme.typography.button.fontFamily} sx={{  fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.5rem" }, }}>
                                ₹{product.price}
                            </Typography>
                            <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.secondary", fontFamily: theme.typography.h6.fontFamily }}>
                                ₹{product.discountPrice}
                            </Typography>
                            <Chip
                                label={`${Math.round((1 - product.discountPrice / product.price) * 10)}% OFF`}
                                color="success"
                                size="small"
                                sx={{ fontFamily: theme.typography.subtitle1.fontFamily }}
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7, fontFamily: theme.typography.body1.fontFamily }}>
                            {product.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ p:1.5, mx:'auto', background: theme.custom.colors.backgroundColor  ,color:theme.palette.primary.contrastText}}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent:'center' ,alignItems:'center'}} >
                                <Image
                                    src={logo}
                                    alt={title}
                                    height={34}
                                    width={30}
                                    priority
                                    style={{ objectFit: "contain", borderRadius: '50%' }}
                                />

                                <Typography variant="h6">{title}</Typography>
                            </Box>
                           
                        </Box>
                        <Box>
                            <BrandAssurance />
                        </Box>
                        <Box sx={{mt:1}}>
                            <Typography
                                variant="h5"
        
                            >
                                Key Features
                            </Typography>

                            <List
                                dense
                                sx={{
                                    mb: 2,
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" }, // 2 columns on small screens and above
                                    gap: 0.5,
                                }}
                            >
                                {product.features.map((f, i) => (
                                    <ListItem key={i} sx={{ py: 0, px: 0 }}>
                                        <ListItemIcon sx={{  minWidth: 15 }}>
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    backgroundColor: "primary.main",
                                                    
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={f}
                                            sx={{ fontFamily: theme.typography.body2.fontFamily }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Box
                            sx={{
                                mb: 2,
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" }, // 2 columns on small screens and above
                                gap: 1.5, // spacing between items
                            }}
                        >
                            {featuresWithIcons.map((feature, index) => (
                                <Box
                                    key={index}
                                    sx={{ display: "flex", alignItems: "center", mb: 1, px: 0 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 30, color: "primary.main" }}>
                                        {feature.icon}
                                    </ListItemIcon>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontFamily: theme.typography.body2.fontFamily }}
                                    >
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
                      {showPriceBreakup ?'Hide Details':'View Details'} {showPriceBreakup ? <ExpandLess /> : <ExpandMore />} 
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
                        {showMetalDetails ? 'Hide Details' : 'View Details'} {showMetalDetails ? <ExpandLess /> : <ExpandMore />}
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
                            <Grid size={{ xs: 6, sm: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    Metal Purity
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.purity}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    Certification
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.certification}</Typography>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6 }}>
                                <Typography variant="subtitle2" fontWeight={600} fontFamily={theme.typography.subtitle2.fontFamily}>
                                    SKU ID
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.typography.body2.fontFamily}>{jewelleryData.sku}</Typography>
                            </Grid>
                            <Grid size={{xs:6 , sm:6}}>
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
                                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
                                  
                                    <Card sx={{  borderRadius: 1, boxShadow: theme.custom.shadows.medium }}>
                                        <CardMedia
                                            component="img"
                                            image={selectedImage}
                                            alt={product.name}
                                            sx={{
                                                width: { xs: 40, sm: 40, md: 50, lg: 60 },
                                                height: { xs: 40, sm: 40, md: 50, lg: 60 },  objectFit: "cover", aspectRatio: "1 / 1" }}
                                        />
                                    </Card>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Typography variant="h6" fontFamily={theme.custom.fonts.special} color={theme.palette.primary.contrastText}>
                                            ₹{product.price}
                                        </Typography>
                                        <Typography variant="body2" fontFamily={theme.custom.fonts.domine} color={theme.palette.primary.contrastText}>
                                            Weight: {product.features.find(f => f.startsWith("Weight:"))?.split(": ")[1]}
                                        </Typography>
                                    </Box>
                                
                                </Box>
                           
                            <Box sx={{ display: "flex", gap: 2 }}>
                              
                            <AppButton
                                label="Add to Cart"
                                appVariant="secondary"
                                fontVariant="exo"
                                    sx={{ fontSize: theme.custom.fontSize?.larger, fontWeight: 400, background:'#541212'}}
                            />
                                <AppButton
                                    label="Buy Now"
                                    appVariant="secondary"
                                    fontVariant="exo"
                                        sx={{ fontSize: theme.custom.fontSize?.larger, fontWeight: 400, background: '#1C352D' }}
                                />
                                </Box>
                        </Toolbar>
                    </AppBar>
                    </Box>
                </ElevationScroll>
            )}
            {isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center',margin:'0 auto' }}>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: isFooterVisible ? -100 : { xs: 0.5, sm: 1.5, md: 2 },
                        right: "auto",
                        left: "auto",
                        background: theme.custom.colors.addtoCart,
                        boxShadow: theme.custom.shadows.medium, 
                        zIndex: 1000,
                        transition: "bottom 0.3s ease",
                        padding: { xs: 1, sm: 1.5, md:2 },
                        width: { xs: '100%', sm: '80%', },
                        borderRadius:2,
                    
                    }}
                >
                    <Box sx={{ display: "flex", gap: 1  }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="body1" fontFamily={theme.custom.fonts.special} color={theme.palette.primary.contrastText}>
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="body2" fontFamily={theme.custom.fonts.domine} color={theme.palette.primary.contrastText} sx={{ fontSize: theme.custom.fontSize?.small, }}>
                                    Weight: {product.features.find(f => f.startsWith("Weight:"))?.split(": ")[1]}
                                </Typography>
                            </Box>
                        <AppButton
                            label="Add to Cart"
                            appVariant="primary"
                            fontVariant="creepster"
                            sx={{ flex: 1, fontSize: theme.custom.fontSize?.small, background:'#253900'}}
                        />
                        <AppButton
                            label="Buy Now"
                            appVariant="secondary"
                            fontVariant="creepster"
                            sx={{ flex: 1, fontSize: theme.custom.fontSize?.small, background: '#541212' }}
                        />
                    </Box>
                </Box>
            </Box>
            )}
            <Box id="footer" sx={{ height: 0, backgroundColor: theme.custom.colors.footer, mt: 0 }} />
        </Container>
    );
}