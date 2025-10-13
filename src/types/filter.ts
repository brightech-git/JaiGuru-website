export interface FilterParams {
    itemName?: string;
    subItemName?: string;
    metalId?: string;
    sizeId?: string;
    sizeName?: string;
    gender?: string;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC' | 'priceLowToHigh' | 'priceHighToLow';
    minGrandTotal?: string;
    maxGrandTotal?: string;
    priceRange?: string;
    occasion?: string;
    materialFinish?: string;
    colorAccent?: string;
    stoneType?: string;
    availability?: string;
    new_arrival?: string;
    top_trending?: boolean;
    featured_products?: boolean;
    best_design?: boolean;
    page?: number;
    pageSize?: number;
}

export interface Product {
    TAGKEY: string;
    ITEMNAME: string;
    SUBITEMNAME: string;
    GrandTotal: string;
    ImagePath: string;
    [key: string]: any; // ✅ fallback for any other fields
}

export interface FilterResponse {
    data: Product[];
    recentSearches: string[];
    noMoreProducts?: boolean;
    totalProducts?: number;
    totalPages?: number;
    hasMore?: boolean;      // 👈 add this
    pageSize?: number;
    page?: number;
    currentPage?: number;
    message?: string;
}