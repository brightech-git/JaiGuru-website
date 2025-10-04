"use client";

import { Box } from "@mui/material";
import FilterBar from "@/component/layout/FilterSection";
import ProductGrid from "@/component/layout/ProductGrid";
import BreadcrumbBanner from "@/component/layout/BreadcrumbBanner";

const sampleProducts = [
    {
        name: "Luxury Watch",
        price: 299,
        images: ["/images/2.webp", "/images/3.webp"],
        backgroundColor: "#ffffff",
        link: "/user/products/1",
    },
    {
        name: "Classic Leather Bag",
        price: 149,
        images: ["/images/111.jpg", "/images/11.webp"],
        backgroundColor: "#ffffffff",
        link: "/user/products/1",
    },
    {
        name: "Sports Shoes",
        price: 99,
        images: ["/images/111.jpg", "/images/11.webp"],
        backgroundColor: "#ffffff",
        link: "/user/products/1",
    },
    {
        name: "Sports Shoes",
        price: 99,
        images: ["/images/111.jpg", "/images/11.webp"],
        backgroundColor: "#fff",
        link: "/user/products/1",
    },
    {
        name: "Sports Shoes",
        price: 99,
        images: ["/images/111.jpg", "/images/11.webp"],
        backgroundColor: "#ffffffff",
        link: "/user/products/1",
    },
    {
        name: "Sports Shoes",
        price: 99,
        images: ["/images/111.jpg", "/images/11.webp"],
        backgroundColor: "#ffffffff",
        link: "/user/products/1",
    },
];
export default function ProductsPage() {
 
   
    return (
        <>
            <BreadcrumbBanner
                title="Smartphones"
                image="/images/22.webp"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Electronics", href: "/electronics" },
                    { label: "Smartphones" },
                ]}
            />
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // 👈 stack on mobile
                gap: {xs:0 ,md:1},
                mt: 1,
                px: 1,
            }}
        >
            {/* Filter */}
            <Box
                sx={{
                    flex: { xs: "0 0 auto", md: "0 0 240px" }, // full width on mobile, fixed width on desktop
                    width: { xs: "100%", md: "auto" },
                    mb: { xs: 2, md: 0 }, // spacing below when stacked
                }}
            >
                <FilterBar />
            </Box>

            {/* Product Grid */}
            <Box sx={{ flex: 1 }}>
                <ProductGrid products={sampleProducts} />
            </Box>
        </Box>
        </>
    );
}
