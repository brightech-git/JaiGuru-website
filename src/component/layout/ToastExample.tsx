"use client";

import React from "react";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

export default function ProductCardExample() {
    const { enqueueSnackbar } = useSnackbar();

    const handleAddToCart = () => {
        // Do your add-to-cart logic here...

        // Show toast
        enqueueSnackbar("Product added to cart!", {
            variant: "success",
            autoHideDuration: 3000,
        });
    };

    return (
        <Button variant="contained" onClick={handleAddToCart}>
            Add to Cart
        </Button>
    );
}
