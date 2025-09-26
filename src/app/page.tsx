"use client";

import AppButton from "@/component/ui/AppButton";
import { Container, Typography, Button, Card, CardContent, TextField, AppBar, Toolbar ,Box} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

import Banner from "@/component/layout/Banner";
import BannerCarousel from "@/component/layout/BannerCarousel";
import img1 from "../images/11.webp";
import img2 from "../images/22.webp";
import img3 from "../images/33.webp";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TwoBannerRow from "@/component/layout/TwoBannerRow";
import FullWidthBanner from "@/component/layout/FullWidthBanner";
import ThemeRadiusCategoryCard from "@/component/layout/ThemeRadiusCategoryCard";
import NoRadiusCategoryCard from "@/component/layout/NoRadiusCategoryCard";
import RoundedCategoryCard from "@/component/layout/RoundedCategoryCard";
import PremiumFinds from "@/component/layout/PremiumFinds";
import theme from "@/theme/theme";
import TwoRowProducts from "@/component/layout/TwoRowProducts";
import LargeScreenBanner from "@/component/layout/LargeScreenBanner";
import LargeScreenBanner2 from "@/component/layout/LargerScreenBanner2";
import HandpickedProducts from "@/component/layout/FeaturedProduct";
import HighlightBanner from "@/component/layout/HighlightBanner";
import ProductCard from "@/component/ui/ProductCard";
import ProductGrid from "@/component/layout/ProductGrid";
import ToastExample from "@/component/layout/ToastExample";


export default function HomePage() {
  const isSuccess = false;
  const categories = [
    { title: "Rounded 50%", image: "/images/11.webp", link: "/category/rounded" },
    { title: "Theme Radius", image: "/images/22.webp", link: "/category/theme" },
    { title: "No Radius", image: "/images/33.webp", link: "/category/no-radius" },
  ];
  const bannerCardss = [
    { image: "/images/11.webp", title: "Men's Collection", ctaText: "Shop Now", ctaLink: "/category/men" },
    { image: "/images/11.webp", title: "Women's Collection", ctaText: "Shop Now", ctaLink: "/category/women" },
    { image: "/images/11.webp", title: "Kids Collection", ctaText: "Shop Now", ctaLink: "/category/kids" },
  ];
  const bannerss = [
    {
      src: '/images/11.webp',
      alt: 'Summer Collection',
      title: 'Summer Vibes',
      subtitle: 'Discover the latest summer collection!',
      buttonText: 'Shop Now',
      buttonLink: '/shop/summer',
    },
    {
      src: '/images/22.webp',
      alt: 'Exclusive Deals',
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off on selected items!',
      buttonText: 'Explore Deals',
      buttonLink: '/deals',
    },
    {
      src: '/images/33.webp',
      alt: 'New Arrivals',
      title: 'New Arrivals',
      subtitle: 'Check out the freshest styles!',
      buttonText: 'See New',
      buttonLink: '/new-arrivals',
    },
  ];
  const banners = [
    {
      image: img1,
      title: "Summer Collection 2025",
      subtitle: "Trendy & comfortable fashion for the season",
      ctaText: "Shop Now",
      ctaLink: "/shop",
    },
    {
      image: img2,
      title: "Exclusive Deals",
      subtitle: "Up to 50% off on selected items",
      ctaText: "Grab Offer",
      ctaLink: "/offers",
    },
    {
      image: img3,
      title: "New Arrivals",
      subtitle: "Discover the latest styles today",
      ctaText: "Explore",
      ctaLink: "/new",
    },
  ];
  const bannerCards = [
    {
      image: "/images/11.webp",
      ctaLink: "/category/men",
    },
    {
      image: "/images/22.webp",
      ctaLink: "/category/women",
    },
    {
      image: "/images/33.webp",
      ctaLink: "/category/kids",
    },
  ];
  const products = [
    { name: "Leather Bag", image: img1 },
    { name: "Sneakers", image: img2 },
    { name: "Smart Watch", image:img3},
    { name: "Sunglasses", image: img3 },
  ];
  const banner = { image:img2, alt: "Main Banner" };

  const mainProducts = [
    {
      name: "Premium Headphones",
      image: "/images/111.jpg",
      link: "/products/headphones",
      itemName: "Headphones",
      subItemName: "Premium",
      subProducts: [
        { name: "Earbuds", image: "/images/111.jpg", link: "/products/earbuds" },
        { name: "Portable Speaker", image: "/images/111.jpg", link: "/products/speaker" },
        { name: "Wireless Charger", image: "/images/111.jpg", link: "/products/charger" },
      ],
    },
    {
      name: "Smart Watch",
      image: "/images/111.jpg",
      link: "/products/smartwatch",
      itemName: "Smartwatch",
      subItemName: "Classic",
      subProducts: [
        { name: "Extra Strap", image: "/images/111.jpg", link: "/products/strap" },
        { name: "Charger", image: "/images/111.jpg", link: "/products/charger" },
      ],
    },
    {
      name: "Wireless Earbuds",
      image: "/images/111.jpg",
      link: "/products/earbuds",
      itemName: "Earbuds",
      subItemName: "Wireless",
      subProducts: [
        { name: "Case", image: "/images/111.jpg", link: "/products/case" },
        { name: "Charger", image: "/images/111.jpg", link: "/products/charger" },
      ],
    },
  ];


  const sampleProducts = [
    {
      name: "Luxury Watch",
      price: 299,
      images: ["/images/111.jpg", "/images/111.jpg"],
      backgroundColor: "#ffffff",
    },
    {
      name: "Classic Leather Bag",
      price: 149,
      images: ["/images/111.jpg", "/images/111.jpg"],
      backgroundColor: "#e0f7fa",
    },
    {
      name: "Sports Shoes",
      price: 99,
      images: ["/images/111.jpg", "/images/11.webp"],
      backgroundColor: "#ffffff",
    },
    {
      name: "Sports Shoes",
      price: 99,
      images: ["/images/111.jpg", "/images/111.jpg"],
      backgroundColor: "#fff",
    },
     {
      name: "Sports Shoes",
      price: 99,
      images: ["/images/111.jpg", "/images/111.jpg"],
      backgroundColor: "#fff3e0",
    },
    {
      name: "Sports Shoes",
      price: 99,
      images: ["/images/111.jpg", "/images/111.jpg"],
      backgroundColor: "#fff3e0",
    },
  ];
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
      <LargeScreenBanner
        title="Featured Products"
        products={products}
        banner={banner}
      // Optional: backgroundColor can be passed
      // backgroundColor="#f5f5f5"
      />
      <LargeScreenBanner2
        title="Featured Products"
        products={products}
        banner={banner}
      // Optional: backgroundColor can be passed
      // backgroundColor="#f5f5f5"
      />
      <TwoRowProducts
        title="Featured Products"
        products={products}
      // Optional: override background color
      // backgroundColor="#334b8c"
      />
      <HandpickedProducts
        title="Featured Collection"
        mainProducts={mainProducts}
        backgroundColor="#f5f5f5"
        baseUrl="https://app.bmgjewellers.com"
      />
      <HighlightBanner
        title="Discover Premium Watches"
        body="Explore timeless craftsmanship and modern designs. Hand-picked to suit your style."
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
          <ThemeRadiusCategoryCard key={id} title={item.title} image={item.image} link={item.link} backgroundColor="#ffffffff" />
        ))}
      </Box>
      <PremiumFinds title="Premium Finds for You" products={products}  />
     
      <FullWidthBanner
        backgroundImage="/images/111.jpg"
        cards={bannerCardss}
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
        <AppButton label="Special Offer" appVariant="primary" color="secondary" fontVariant="satisfy" />
        <Button variant="text" color="secondary" size="large">
          Shop Now
        </Button>
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
          sx={{
            mt: 0,
            borderRadius: 0,
          }}
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