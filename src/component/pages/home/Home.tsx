"use client";

import { Container, Typography, Button, Card, CardContent, TextField, Box } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import AppButton from "@/component/ui/AppButton";
import Banner from "@/component/layout/Banner";
import BannerCarousel from "@/component/layout/BannerCarousel";
import TwoBannerRow from "@/component/layout/TwoBannerRow";
import FullWidthBanner from "@/component/layout/FullWidthBanner";
import ThemeRadiusCategoryCard from "@/component/layout/ThemeRadiusCategoryCard";
// import PremiumFinds from "@/component/layout/PremiumFinds";
// import TwoRowProducts from "@/component/layout/TwoRowProducts";
// import LargeScreenBanner from "@/component/layout/LargeScreenBanner";
// import LargeScreenBanner2 from "@/component/layout/LargerScreenBanner2";
// import HandpickedProducts from "@/component/layout/FeaturedProduct";
import HighlightBanner from "@/component/layout/HighlightBanner";
import ProductGrid from "@/component/layout/ProductGrid";
import ToastExample from "@/component/layout/ToastExample";

// ✅ Import data
import { categories, banners, products, banner, mainProducts, sampleProducts} from "@/data/Home";

export default function HomePage() {
    const isSuccess = false;

    return (
        <>
            <Banner
                title="Summer Collection 2025"
                subtitle="Discover fresh arrivals and trending styles curated just for you."
                ctaLabel="Explore Now"
                ctaHref="/collection/summer"
                imageUrl="/images/33.webp"
            />

            <BannerCarousel banners={banners} />

            <TwoBannerRow
                leftImage="/images/11.webp"
                rightImage="/images/22.webp"
                height={{ xs: 200, sm: 300, md: 400 }}
            />
{/* 
            <LargeScreenBanner title="Featured Products" products={products} banner={banner} />
            <LargeScreenBanner2 title="Featured Products" products={products} banner={banner} />

            <TwoRowProducts title="Featured Products" products={products} />

            <HandpickedProducts
                title="Featured Collection"
                mainProducts={mainProducts}
                backgroundColor="#f5f5f5"
                baseUrl="https://app.bmgjewellers.com"
            /> */}

            <HighlightBanner
                title="Discover Premium Watches"
                body="Explore timeless craftsmanship and modern designs."
                products={[
                    { name: "Watch 1", image: "/images/111.jpg", link: "/products/1" },
                    { name: "Watch 2", image: "/images/111.jpg", link: "/products/2" },
                    { name: "Watch 3", image: "/images/111.jpg", link: "/products/3" },
                ]}
                backgroundColor="#d3adf1ff"
            />

            <ToastExample />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 0,
                    padding: { xs: 1, md: 2 },
                    maxWidth: "100%",
                    overflowX: "auto",
                }}
            >
                {categories.map((item, id) => (
                    <ThemeRadiusCategoryCard key={id} {...item} backgroundColor="#ffffffff" />
                ))}
            </Box>

            {/* <PremiumFinds title="Premium Finds for You" products={products} /> */}

            <FullWidthBanner
                backgroundImage="/images/111.jpg"
                cards={[
                    { image: "/images/11.webp", ctaLink: "/category/men" ,title:'product1'},
                    { image: "/images/22.webp", ctaLink: "/category/women", title: 'product2'},
                    { image: "/images/33.webp", ctaLink: "/category/kids", title: 'product3'},
                ]}
                height={450}
                backgroundColor="rgba(0,0,0,0.2)"
            />

            <ProductGrid products={sampleProducts} />

            <Container sx={{ py: 6 }}>
                <Typography variant="h1" gutterBottom>
                    Welcome to Our Store
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Explore our latest collection with premium quality products.
                </Typography>

                {/* Buttons */}
                <AppButton label="Special Offer" appVariant="primary" color="secondary" fontVariant="satisfy" />
                <Button variant="text" color="secondary" size="large">Shop Now</Button>
                <AppButton label="Buy Now" variant="outlined" color="primary" size="small" />
                <AppButton label="Shop Now" variant="contained" color="primary" size="large" />
                <AppButton label="Add to Cart" variant="text" color="secondary" />
                <AppButton
                    label="Details"
                    variant="contained"
                    sx={{
                        color: "#ffffffff",
                        backgroundColor: isSuccess ? "#700000ff" : "#203a02ff",
                        fontFamily: (theme) => theme.typography.button,
                    }}
                />
                <AppButton
                    label="View Details"
                    variant="outlined"
                    startIcon={<InfoOutlined />}
                    sx={{ mt: 0, borderRadius: 0 }}
                />

                <Card sx={{ mt: 4, maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Featured Product
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            High-quality product designed for modern lifestyle.
                        </Typography>
                        <TextField fullWidth label="Enter Email for Updates" variant="outlined" />
                        <Button fullWidth variant="contained" color="secondary" sx={{ mt: 2 }}>
                            Subscribe
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
