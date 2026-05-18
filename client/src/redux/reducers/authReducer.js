import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || token === "null" || token === "undefined") {
        throw { error: "Not authorized, no token!" };
      }
      console.log("======== CURRENT USER TOKEN ========", token);
      const response = await axios.get("/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("userAuthData: ", response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw { error: error.response?.data?.message };
      }
      throw { error: "An unknown error occurred!" };
    }
  },
);

const currentUserSlice = createSlice({
  name: "userAuthData",
  initialState: {
    userAuthData: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userAuthData = null;
      state.loading = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.userAuthData = null;
      state.loading = "loading";
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.userAuthData = action.payload;
      state.loading = "loaded";
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.userAuthData = null;
      state.loading = "loaded";
      state.error = "error";
    });
  },
});

export const { logout } = currentUserSlice.actions;
export const selectUserAuth = (state) => state.userAuthData;
export default currentUserSlice.reducer;
