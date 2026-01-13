export interface User {
    name: string;
    mobile: string;
}

export interface Address {
    id: number;
    name: string;
    type: 'HOME' | 'WORK' | 'OTHER';
    mobile: string;
    address: string;
    isDefault: boolean;
    pincode?: string;
    city?: string;
    state?: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface PriceDetails {
    MOCK_CART_ITEMS: { id: number; name: string; price: number; image: string; weight: number; sku?: string }[];
    subtotal: number;
    platformFee: number;
    total: number;
    savings: number;
}