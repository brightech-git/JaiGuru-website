import React from "react";
import ImageGrid from "./ImageGrid";
const galleryImages = [
    {
        url: "https://app.bmgjewellers.com/uploads/budget/e708e9ab-6c0e-4c09-94a0-abf76811df13_bmg-22.jpg",
        title: "Gold Necklace",
        link: "https://bmgjewellers.com/collections/necklace",
    },
    {
        url: "https://app.bmgjewellers.com/uploads/budget/e708e9ab-6c0e-4c09-94a0-abf76811df13_bmg-22.jpg",
        title: "Diamond Ring",
        link: "https://bmgjewellers.com/collections/rings",
    },
    {
        url: "https://app.bmgjewellers.com/uploads/budget/e708e9ab-6c0e-4c09-94a0-abf76811df13_bmg-22.jpg",
        title: "Traditional Bangle",
    },
    {
        url: "https://app.bmgjewellers.com/uploads/budget/e708e9ab-6c0e-4c09-94a0-abf76811df13_bmg-22.jpg",
        title: "Elegant Earrings",
        link: "https://bmgjewellers.com/collections/earrings",
    },
];

const GallerySection = () => {
    return (
        <div className="px-4 md:px-10 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Our Featured Collections
            </h2>
            <ImageGrid images={galleryImages} />
        </div>
    );
};

export default GallerySection;
