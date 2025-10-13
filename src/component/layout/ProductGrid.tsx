"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import ProductCard from "../ui/ProductCard";

interface Product {
    name: string;
    price: string | number;
    images: string[];
    backgroundColor?: string;
    itemSno?: string;
    link?: string | number;
}

interface ProductGridProps {
    products: Product[];
    onToggleWishlist?: (itemSno: string) => void;
    onAddToCart?: (item: { itemSno: string; itemName: string; price: number; image: string }) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onToggleWishlist, onAddToCart }) => {
    return (
        <Box
            sx={{
                width: "100%",
                mx: "auto",
                p: { xs: 1, sm: 1.5, md: 2 },
            }}
        >
            <Grid
                container
                spacing={{ xs: 1, sm: 1.5, md: 2 }}
                columns={{ xs: 4, sm: 9, md: 12, lg: 12, xl: 12 }}
                
            >
                {products.map((product, idx) => (
                    <Grid
                     
                        key={idx}
                        size={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 3 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ProductCard
                            name={product.name}
                            price={product.price}
                            images={product.images}
                            backgroundColor={product.backgroundColor}
                            itemSno={product.itemSno}
                            link={product.link}
                            onToggleWishlist={onToggleWishlist}
                            onAddToCart={onAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductGrid;