// apiSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../../utils/Const';

export const fetchApiData = createAsyncThunk(
  'api/fetchApiData',
  async token => {
    try {
      const response = await axios.get(BASE_URL + `/User/getCart1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //   return response?.data?.cart?;
    } catch (error) {
      throw new Error('Error fetching API data');
    }
  },
);

const cartapiSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addToCart(fetchApiData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addToCart(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addToCart(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartapiSlice.reducer;
