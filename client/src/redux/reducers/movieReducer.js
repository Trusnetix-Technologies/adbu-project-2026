// Three cases of fetching the movies:
// 1. fetched/fulfilled
// 2. rejected
// 3. pending

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await axios.get("/api/v1/get/movies");
    console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("ERROR FETCHING MOVIES: ", error);
    throw { error: error.message };
  }
});

const movieSlice = createSlice({
  name: "moviesData",
  initialState: {
    movies: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // when the fetchMovies is pending, the movies will be set to the following state
    builder.addCase(fetchMovies.pending, (state) => {
      state.movies = [];
      state.loading = "loading";
      state.error = null;
    });
    // when the fetchMovies is fulfilled, the movies will be set to the following state
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload.response; // action.payload is the data from the server
      state.loading = "loaded";
      state.error = null;
    });
    // when the fetchMovies is rejected, the movies will be set to the state
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.movies = [];
      state.loading = "error";
      state.error = action.error.error; // action.error.error is the error message from the server
    });
  },
});

export const movieReducer = movieSlice.reducer;
export const selectMovies = (state) => state.moviesData;
