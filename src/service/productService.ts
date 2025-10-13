import PublicUrl from '@/api/publicUrl';
import { FilterParams, FilterResponse } from '@/types/filter';
import { AxiosResponse } from 'axios';

export const fetchFilteredProducts = async (filters: FilterParams): Promise<FilterResponse> => {
    console.log('API Filters:', filters);
    try {
        const response: AxiosResponse<FilterResponse> = await PublicUrl.get('/product/items/filter', {
            params: filters,
        });
        console.log('Raw API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        throw error;
    }
};


export const fetchProductById = async (id: string) => {
    const { data } = await PublicUrl.get('/product/getTagkeyFilter',{
        params: {
            tagkey: id
        }
    })
    return data;
};