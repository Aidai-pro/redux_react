import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // массив поездок
  loading: false,
  error: null
};

const ridesSlice = createSlice({
  name: 'rides',
  initialState,
  reducers: {
    addRide: (state, action) => {
      state.items.push(action.payload); // добавляем в массив
    },
    
    // Загрузить все поездки (для будущего API)
    setRides: (state, action) => {
      state.items = action.payload;
    },
    
    // Удалить поездку
    removeRide: (state, action) => {
      state.items = state.items.filter(ride => ride.id !== action.payload);
    },
    
    // Обновить поездку
    updateRide: (state, action) => {
      const index = state.items.findIndex(ride => ride.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    }
  }
});

export const { addRide, setRides, removeRide, updateRide } = ridesSlice.actions;
export default ridesSlice.reducer;