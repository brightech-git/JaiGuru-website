export interface Product {
    id: number;
    name: string;
    price: number;
    discountPrice: number;
    images: string[];
    backgroundColor?: string;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    features: string[];
}