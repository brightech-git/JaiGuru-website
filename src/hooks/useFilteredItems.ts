// src/hooks/useFilteredItems.ts
import { useQuery } from "@tanstack/react-query";
import { fetchFilteredItems } from "@/service/itemService";

export const useFilteredItems = (filters: any) => {
    return useQuery({
        queryKey: ["filteredItems", filters],
        queryFn: () => fetchFilteredItems(filters),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60, // 1 min cache
    });
};
