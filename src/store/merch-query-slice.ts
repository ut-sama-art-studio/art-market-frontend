import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    MerchType,
    QueryMerchPageArgs,
    defaultQueryMerchPageArgs,
} from "@/services/merch/merch-service";

const merchQuerySlice = createSlice({
    name: "merchQuery",
    initialState: defaultQueryMerchPageArgs,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
            state.page = 1; // reset to the first page when searching
        },
        setSort: (
            state,
            action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>
        ) => {
            state.sortBy = action.payload.sortBy;
            state.sortOrder = action.payload.sortOrder;
        },
        setType: (state, action: PayloadAction<{ type: MerchType }>) => {
            state.type = action.payload.type;
            state.page = 1; // reset to the first page when changing type
        },

        // Merges new args with the existing state
        setQueryArgs: (
            state,
            action: PayloadAction<Partial<QueryMerchPageArgs>>
        ) => {
            return { ...state, ...action.payload };
        },

        // Resets everything to default
        resetQueryArgs: () => defaultQueryMerchPageArgs,
    },
});

export const {
    setPage,
    setKeyword,
    setSort,
    setType,
    setQueryArgs,
    resetQueryArgs,
} = merchQuerySlice.actions;
export default merchQuerySlice.reducer;
