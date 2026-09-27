import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  destinations: [],
  destination: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  pagination: {}
};

// Fetch all destinations
export const getDestinations = createAsyncThunk(
  'destinations/getAll',
  async (queryString = '', thunkAPI) => {
    try {
      const response = await api.get(`/destinations${queryString}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch single destination
export const getDestination = createAsyncThunk(
  'destinations/getSingle',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/destinations/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create destination
export const createDestination = createAsyncThunk(
  'destinations/create',
  async (destinationData, thunkAPI) => {
    try {
      // Need to send as FormData if images are included
      const response = await api.post('/destinations', destinationData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const destinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    clearDestination: (state) => {
      state.destination = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getDestinations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDestinations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.destinations = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getDestinations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get single
      .addCase(getDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.destination = action.payload.data;
      })
      .addCase(getDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create
      .addCase(createDestination.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.destinations.unshift(action.payload.data);
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearDestination } = destinationSlice.actions;
export default destinationSlice.reducer;
