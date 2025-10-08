// component/pages/product/ProductDetailClient.tsx
"use client";

import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    Chip,
    Rating,
    Container,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Product } from "@/types/product";

interface ProductDetailsClientProps {
    product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 1, sm: 2 } }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <Card sx={{ mb: 2, borderRadius: 0, boxShadow: theme.custom.shadows.medium }}>
                            <CardMedia
                                component="img"
                                image={selectedImage}
                                alt={product.name}
                                sx={{ width: { xs: 250, sm: 300, md: 350, lg: 400 }, height: { xs: 250, sm: 300, md: 350, lg: 400 }, objectFit: "cover", aspectRatio: "1 / 1" }}
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
                                        borderRadius: {xs:1,md:2,lg:3},
                                    }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <CardMedia component="img" image={img} alt={`Thumbnail ${i + 1}`} sx={{ width: "100%", height: "100%", objectFit: "cover" ,}} />
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7 }}>
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
                        <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" }, lineHeight: 1.2 }}>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                                ₹{product.discountPrice}
                            </Typography>
                            <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                                ₹{product.price}
                            </Typography>
                            <Chip
                                label={`${Math.round((1 - product.discountPrice / product.price) * 100)}% OFF`}
                                color="success"
                                size="small"
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                            {product.description}
                        </Typography>
                        {/* Add other sections like features, price breakup, etc., as needed */}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}