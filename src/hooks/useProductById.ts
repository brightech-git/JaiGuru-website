import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/service/productService";

export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProductById(id),
        enabled: !!id, // only fetch when id exists
        staleTime: 1000 * 60, // 1 minute cache
    });
};
