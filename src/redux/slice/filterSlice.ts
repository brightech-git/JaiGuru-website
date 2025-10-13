import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterParams } from '@/types/filter';

interface FilterState {
    filters: FilterParams;
}

const initialState: FilterState = {
    filters: {
        page: 0,
        pageSize: 20,
        minGrandTotal: '0',
        maxGrandTotal: '100000',
        gender: '',
        occasion: '',
        sizeName: '',
        colorAccent: '',
        materialFinish: '',
        itemName: '',
        subItemName:'',
        sortBy: 'GRAND_TOTAL',
        sortDirection: 'ASC',
        top_trending: false,
        featured_products: false,
        best_design: false,
        new_arrival: '',
        availability: '',
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<FilterParams>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.filters.page = action.payload;
        },
        setItemName: (state, action: PayloadAction<string>) => {
            state.filters.itemName = action.payload;
        },
        setSubItemName: (state, action: PayloadAction<string>) => {
            state.filters.subItemName = action.payload;
        },
    },
});

export const { setFilters, resetFilters, setPage, setItemName } = filterSlice.actions;
export default filterSlice.reducer;