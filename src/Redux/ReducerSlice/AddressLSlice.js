import {createSlice} from '@reduxjs/toolkit';

const AddressLSlice = createSlice({
  name: 'address',
  initialState: {
    currentAddress: '',
    animalAddress: '',
  },
  reducers: {
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },

    setAnimalAddress: (state, action) => {
      state.animalAddress = action.payload;
    },
  },
});

export const {setCurrentAddress, setAnimalAddress} = AddressLSlice.actions;

export default AddressLSlice.reducer;
