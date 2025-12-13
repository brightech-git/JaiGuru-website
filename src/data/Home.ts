// src/data/homeData.ts
import { Product } from "@/types/product";
import img1 from "../images/11.webp";
import img2 from "../images/22.webp";
import img3 from "../images/33.webp";

export const categories = [
    { title: "Rounded 50%", image: "/images/11.webp", link: "/category/rounded" },
    { title: "Theme Radius", image: "/images/22.webp", link: "/category/theme" },
    { title: "No Radius", image: "/images/33.webp", link: "/category/no-radius" },
    { title: "Rounded 50%", image: "/images/11.webp", link: "/category/rounded" },
    { title: "Theme Radius", image: "/images/22.webp", link: "/category/theme" },
    { title: "No Radius", image: "/images/33.webp", link: "/category/no-radius" },
    { title: "Rounded 50%", image: "/images/11.webp", link: "/category/rounded" },
    { title: "Theme Radius", image: "/images/22.webp", link: "/category/theme" },
    { title: "No Radius", image: "/images/33.webp", link: "/category/no-radius" },
    { title: "Rounded 50%", image: "/images/11.webp", link: "/category/rounded" },
    { title: "Theme Radius", image: "/images/22.webp", link: "/category/theme" },
    { title: "No Radius", image: "/images/33.webp", link: "/category/no-radius" },
];

export const banners = [
    {
        image: img1,
        title: "Summer Collection 2025",
        subtitle: "Trendy & comfortable fashion for the season",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        id:1
    },
    {
        image: img2,
        title: "Exclusive Deals",
        subtitle: "Up to 50% off on selected items",
        ctaText: "Grab Offer",
        ctaLink: "/offers",
        id:2
    },
    {
        image: img3,
        title: "New Arrivals",
        subtitle: "Discover the latest styles today",
        ctaText: "Explore",
        ctaLink: "/new",
        id:3
    },
];

export const products = [
    { name: "Leather Bag", image: img1  ,id:1},
    { name: "Sneakers", image: img2 ,id:2},
    { name: "Smart Watch", image: img3 ,id:3},
    { name: "Sunglasses", image: img3 ,id:4},
];

export const banner = { image: img2, alt: "Main Banner" };

export const mainProducts = [
    {
        name: "Premium Headphones",
        image: "/images/111.jpg",
        link: "/products/headphones",
        itemName: "Headphones",
        subItemName: "Premium",
        subProducts: [
            { name: "Earbuds", image: "/images/111.jpg", link: "/products/earbuds",id:1 },
            { name: "Portable Speaker", image: "/images/111.jpg", link: "/products/speaker" ,id:2},
            { name: "Wireless Charger", image: "/images/111.jpg", link: "/products/charger" ,id:3},
        ],
    },
    {
        name: "Smart Watch",
        image: "/images/111.jpg",
        link: "/products/smartwatch",
        itemName: "Smartwatch",
        subItemName: "Classic",
        subProducts: [
            { name: "Extra Strap", image: "/images/111.jpg", link: "/products/strap" ,id:1},
            { name: "Charger", image: "/images/111.jpg", link: "/products/charger" ,id:2},
        ],
    },
    {
        name: "Smart Watch",
        image: "/images/111.jpg",
        link: "/products/smartwatch",
        itemName: "Smartwatch",
        subItemName: "Classic",
        subProducts: [
            { name: "Extra Strap", image: "/images/111.jpg", link: "/products/strap", id: 1 },
            { name: "Charger", image: "/images/111.jpg", link: "/products/charger", id: 2 },
        ],
    },
    {
        name: "Smart Watch",
        image: "/images/111.jpg",
        link: "/products/smartwatch",
        itemName: "Smartwatch",
        subItemName: "Classic",
        subProducts: [
            { name: "Extra Strap", image: "/images/111.jpg", link: "/products/strap", id: 1 },
            { name: "Charger", image: "/images/111.jpg", link: "/products/charger", id: 2 },
        ],
    },
    {
        name: "Smart Watch",
        image: "/images/111.jpg",
        link: "/products/smartwatch",
        itemName: "Smartwatch",
        subItemName: "Classic",
        subProducts: [
            { name: "Extra Strap", image: "/images/111.jpg", link: "/products/strap", id: 1 },
            { name: "Charger", image: "/images/111.jpg", link: "/products/charger", id: 2 },
        ],
    },
];
// data/Home.ts
export const sampleProducts: Product[] = [
    {
        id: 1,
        name: "Luxury Watch",
        price: 299,
        discountPrice: 249,
        images: ["/images/111.jpg", "/images/111.jpg"],
        backgroundColor: "#ffffff",
        description: "A luxurious watch crafted with precision.",
        category: "Watches",
        rating: 4.5,
        reviewCount: 128,
        features: ["Water Resistant", "Stainless Steel", "2-Year Warranty"],
        badges: ["Sale", "New"],
    },
    {
        id: 2,
        name: "Classic Leather Bag",
        price: 149,
        discountPrice: 129,
        images: ["/images/111.jpg", "/images/111.jpg"],
        backgroundColor: "#e0f7fa",
        description: "A stylish and durable leather bag.",
        category: "Bags & Luggage",
        rating: 4.0,
        reviewCount: 85,
        features: ["Genuine Leather", "Adjustable Strap", "1-Year Warranty"],
        badges: ["Sale", "New"],
    },
];