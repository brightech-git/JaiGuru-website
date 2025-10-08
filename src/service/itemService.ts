import PublicUrl from "@/api/publicUrl";

interface FilterParams {
    itemName?: string;
    subItemName?: string;
    metalId?: string;
    sizeId?: string;
    sizeName?: string;
    catName?: string;
    gender?: string;
    sortBy?: string;
    sortDirection?: string;
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

export const fetchFilteredItems = async (params: FilterParams) => {
    const response = await PublicUrl.get("/product/items/filter", { params });
    return response.data;
};
