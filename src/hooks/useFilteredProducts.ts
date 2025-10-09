import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchFilteredProducts } from '@/service/productService';
import { FilterParams, FilterResponse } from '@/types/filter';

export const useFilteredProducts = (filters: FilterParams): UseQueryResult<FilterResponse, Error> => {
    return useQuery<FilterResponse, Error>({
        queryKey: ['filteredProducts', filters],
        queryFn: () => fetchFilteredProducts(filters),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        placeholderData: (previousData) => previousData,
    });
};