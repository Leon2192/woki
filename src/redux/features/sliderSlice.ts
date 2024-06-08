import { createSlice } from '@reduxjs/toolkit';

export const sliderSlice = createSlice({
    name: 'slider',
    initialState: {
        value: 0,
        length: 3,
    },
    reducers: {
        setSliderLength: (state, action) => {
            state.length = action.payload;
            console.log("next slide")
        },
        nextSlide: (state) => {
            state.value = (state.value + 1) % state.length;
        },
        prevSlide: (state) => {
            state.value = (state.value - 1 + state.length) % state.length;
            console.log("prev slideee")
        },
        dotSlide: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSliderLength, nextSlide, prevSlide, dotSlide } = sliderSlice.actions;

export default sliderSlice.reducer;
