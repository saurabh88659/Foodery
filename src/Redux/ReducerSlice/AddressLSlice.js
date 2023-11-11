import {createSlice} from '@reduxjs/toolkit';

const AddressLSlice = createSlice({
  name: 'address',
  initialState: {
    currentAddress: '',
    animalAddress: '',
    newAddress: '',
  },
  reducers: {
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },

    setAnimalAddress: (state, action) => {
      state.animalAddress = action.payload;
    },

    newAddressbyid: (state, action) => {
      state.newAddress = action.payload;
    },
  },
});

export const {setCurrentAddress, setAnimalAddress, newAddressbyid} =
  AddressLSlice.actions;

export default AddressLSlice.reducer;
