import {createSlice} from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profiledata: '',
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profiledata = action.payload;
    },
  },
});

export const {setProfileData} = ProfileSlice.actions;

export default ProfileSlice.reducer;
