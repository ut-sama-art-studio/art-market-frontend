import { configureStore } from "@reduxjs/toolkit";
import merchQueryReducer from "./merch-query-slice";

export const store = configureStore({
    reducer: {
        merchQuery: merchQueryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
