// src/redux/slices/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
    gender?: string;
    occasion?: string;
    sizes: string[];
    color?: string;
    finish?: string;
    priceRange: [number, number];
}

const initialState: FilterState = {
    gender: undefined,
    occasion: undefined,
    sizes: [],
    color: undefined,
    finish: undefined,
    priceRange: [0, 1000],
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Partial<FilterState>>) {
            Object.assign(state, action.payload);
        },
        updateFilter(
            state,
            action: PayloadAction<{ key: keyof FilterState; value: any }>
        ) {
            state[action.payload.key] = action.payload.value;
        },
        toggleSize(state, action: PayloadAction<string>) {
            if (state.sizes.includes(action.payload)) {
                state.sizes = state.sizes.filter((s) => s !== action.payload);
            } else {
                state.sizes.push(action.payload);
            }
        },
        resetFilters(state) {
            state.gender = undefined;
            state.occasion = undefined;
            state.sizes = [];
            state.color = undefined;
            state.finish = undefined;
            state.priceRange = [0, 1000];
        },
    },
});

export const { setFilters, updateFilter, toggleSize, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
