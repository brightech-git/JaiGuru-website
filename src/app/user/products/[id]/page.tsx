"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useProductById } from "@/hooks/useProductById";
import ProductDetailsClient from "@/component/pages/product/ProductDetailClient";
import { CircularProgress, Box, Typography } from "@mui/material";
import { getProductImages } from "@/lib/utils";
import { getProductPrice } from "@/lib/priceUtils";
import { formatWeight } from "@/lib/weightUtils";
import { useTheme } from "@mui/material/styles";

export default function ProductPage() {
    const { id } = useParams();
    const theme = useTheme();
    const { data: productDatas, isLoading, isError } = useProductById(id as string);
    const productData = productDatas?.[0];

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10, backgroundColor: theme.palette.background.paper }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !productData) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10, backgroundColor: theme.palette.background.paper }}>
                <Typography variant="h6" color="text.secondary">Product not found</Typography>
            </Box>
        );
    }

    const product = {
        id: productData.ITEMID,
        name: productData.ITEMNAME,
        price: getProductPrice(productData),
        discountPrice: Number(productData.SALVALUE),
        images: getProductImages(productData.ImagePath),
        description: productData.Description,
        category: productData.CATNAME,
        rating: 4.5,
        reviewCount: 20,
        features: [
            `Material: ${productData.MaterialFinish}`,
            `Weight: ${formatWeight(productData.NETWT)}`,
            `Purity: ${productData.PURITY}%`,
            `Occasion: ${productData.Occasion}`,
            `Studded: ${productData.STUDDEDSTONE}`,
            
        ],
        badges: [
            ...(productData.FeaturedProducts === "1" ? ["Featured"] : []),
            ...(productData.BestDesign === "1" ? ["Best Design"] : []),
            ...(productData.TopTrending === true || productData.TopTrending === "1" ? ["Trending"] : []),
        ],
    };

    return <ProductDetailsClient product={product} />;
}