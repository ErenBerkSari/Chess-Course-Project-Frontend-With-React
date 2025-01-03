import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/apiConfig";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/${userId}`
      );
      console.log("API Response:", response.data); // Konsola yazdır

      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "users/getAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/users`
      );
      console.log("API Response:", response.data); // Konsola yazdır

      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTopUser = createAsyncThunk(
  "users/getTopUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/top`
      );
      console.log("API Response:", response.data); // Konsola yazdır

      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProgress = createAsyncThunk(
  "users/getUserProgress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/overallProgress/${userId}`
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProgress = createAsyncThunk(
  "users/updateUserProgress",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/overallProgress/${userId}`
      );
      console.log("API Response:", response.data);

      // Burada gelen verinin doğru olduğuna emin olun
      if (response.data?.overallProgress) {
        return response.data; // progress verisini döndür
      } else {
        return rejectWithValue("Güncelleme hatası: Progress verisi yok.");
      }
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUserProfileImage = createAsyncThunk(
  "users/updateUserProfileImage",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/uploadProfileImage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Yanıtı:", response.data); // Yanıtı kontrol et

      if (response.data && response.data.user) {
        return response.data.user; // 'user' nesnesini döndür
      } else {
        return rejectWithValue("Profil resmi güncelleme hatası.");
      }
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/${userId}`
      );
      console.log("API Response:", response.data);
      return userId;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    isLoading: false,
    isLoadingHome: false,
    progresses: null,
    profileImage: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.profileImage = null; // Profil resmini sıfırlıyoruz
    },
    clearUsersListState: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.profileImage = action.payload.profileImage;
        console.log("getUser:", state.profileImage);
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getTopUser.pending, (state) => {
        state.isLoadingHome = true;
      })
      .addCase(getTopUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.profileImage = action.payload.profileImage;
        state.isLoadingHome = false;
      })
      .addCase(getTopUser.rejected, (state, action) => {
        state.isLoadingHome = false;
      })
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
        state.isLoadingHome = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.isLoadingHome = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingHome = false;
      })
      .addCase(getUserProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProgress.fulfilled, (state, action) => {
        state.progresses = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Hata:", action.error.message); // Hata mesajını logla
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUserProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProgress.fulfilled, (state, action) => {
        state.progresses = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Hata:", action.error.message); // Hata mesajını logla
      })
      .addCase(updateUserProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfileImage.fulfilled, (state, action) => {
        console.log("Profile image güncelleniyor:", action.payload);

        state.profileImage = action.payload.profileImage;
        console.log("updateUserProfileImage:", state.profileImage);

        state.isLoading = false;
      })
      .addCase(updateUserProfileImage.rejected, (state) => {
        state.isLoading = false;
        console.log("Profile image güncelleme hatası:", action.error.message);
      });
  },
});
export const { clearUserState, clearUsersListState } = userSlice.actions;

export default userSlice.reducer;
