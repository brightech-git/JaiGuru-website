// data/productData.ts
export const productData = {
    id: 1,
    name: "Premium Leather Bag",
    description: "This premium leather bag is crafted with top-quality materials. Perfect for everyday use, durable, and stylish. Features multiple compartments for optimal organization and a sleek design that complements any outfit.",
    price: 2499,
    discountPrice: 1999,
    images: [
        "/images/2.webp",
        "/images/3.webp",
        "/images/111.jpg",
        "/images/111.jpg",
        "/images/111.jpg",
    ],
    features: [
        "100% Genuine Leather",
        "Handmade Craftsmanship",
        "Adjustable Strap",
        "1-Year Warranty",
        "Water Resistant",
        "Multiple Compartments",
        "Anti-Theft Zipper",
        "Detachable Shoulder Strap"
    ],
    category: "Bags & Luggage",
    sku: "PLB-2024-BLK",
    stock: 12,
    rating: 4.5,
    reviewCount: 128,
    brand: "Luxury Crafts",
    specifications: {
        material: "Genuine Leather",
        dimensions: "30cm x 20cm x 15cm",
        weight: "1.2 kg",
        color: "Black",
        closure: "Zipper",
        style: "Crossbody",
        capacity: "15L"
    },
    shippingInfo: {
        freeShipping: true,
        minForFreeShipping: 999,
        deliveryTime: "2-3 business days",
        returnPolicy: "30 days return policy"
    },
    tags: ["leather", "premium", "handmade", "fashion", "bag", "accessory"],
    variants: [
        {
            id: 1,
            color: "Black",
            image: "/images/2.webp",
            inStock: true
        },
        {
            id: 2,
            color: "Brown",
            image: "/images/3.webp",
            inStock: true
        },
        {
            id: 3,
            color: "Navy Blue",
            image: "/images/111.jpg",
            inStock: false
        }
    ],
    relatedProducts: [101, 102, 103],
    warranty: "2-year manufacturer warranty",
    careInstructions: [
        "Wipe clean with a damp cloth",
        "Avoid direct sunlight",
        "Use leather conditioner monthly"
    ]
};

// Optional: You might also want related products data
export const relatedProducts = [
    {
        id: 101,
        name: "Classic Leather Backpack",
        price: 2999,
        discountPrice: 2299,
        image: "/images/related1.jpg",
        rating: 4.3
    },
    {
        id: 102,
        name: "Minimalist Leather Wallet",
        price: 1299,
        discountPrice: 999,
        image: "/images/related2.jpg",
        rating: 4.7
    },
    {
        id: 103,
        name: "Leather Laptop Bag",
        price: 3499,
        discountPrice: 2799,
        image: "/images/related3.jpg",
        rating: 4.5
    }
];

// Optional: Product reviews data
export const productReviews = [
    {
        id: 1,
        user: "John Doe",
        rating: 5,
        comment: "Excellent quality! The leather feels premium and the craftsmanship is outstanding.",
        date: "2024-01-15",
        verified: true
    },
    {
        id: 2,
        user: "Sarah Smith",
        rating: 4,
        comment: "Great bag, but a bit smaller than expected. Otherwise perfect!",
        date: "2024-01-10",
        verified: true
    },
    {
        id: 3,
        user: "Mike Johnson",
        rating: 5,
        comment: "Worth every penny. The attention to detail is impressive.",
        date: "2024-01-05",
        verified: false
    }
];