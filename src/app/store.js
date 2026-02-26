import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import ridesReducer from '../features/rides/ridesSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        rides: ridesReducer
    }
})