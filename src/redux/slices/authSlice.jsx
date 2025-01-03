import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api/axios";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "https://chess-course-project-backend-with-node-js.onrender.com/auth/login",
        credentials,
        { withCredentials: true }
      );
      await new Promise((resolve) => setTimeout(resolve, 100));

      const { userId, email, role } = response.data;
      return { userId, email, role };
    } catch (error) {
      console.error("Login işlemi sırasında hata: ", error);
      if (error.response) {
        // Sunucudan gelen hata mesajını döndür
        return rejectWithValue(
          error.response.data.message || "Bilinmeyen bir hata oluştu."
        );
      } else if (error.request) {
        return rejectWithValue(
          "Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin."
        );
      } else {
        return rejectWithValue("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "https://chess-course-project-backend-with-node-js.onrender.com/auth/register",
        userData,
        { withCredentials: true }
      );
      await new Promise((resolve) => setTimeout(resolve, 100));

      const { userId, email, role } = response.data;
      return { userId, email, role };
    } catch (error) {
      console.error("Register işlemi sırasında hata: ", error);

      if (error.response) {
        // Sunucudan gelen hata mesajını döndür
        return rejectWithValue(
          error.response.data.message || "Bilinmeyen bir hata oluştu."
        );
      } else if (error.request) {
        return rejectWithValue(
          "Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin."
        );
      } else {
        return rejectWithValue("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "https://chess-course-project-backend-with-node-js.onrender.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Logout isteği başarısız", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Logout failed. Please try again.");
      }
    }
  }
);
export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "https://chess-course-project-backend-with-node-js.onrender.com/auth/refresh"
      ); // Refresh token'ı kullanarak erişim token'ı yenile
      const { accessToken } = response.data;
      return accessToken;
    } catch (error) {
      console.error("Refresh token error:", error);
      return rejectWithValue("Failed to refresh access token.");
    }
  }
);
export const checkAuth = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      // İlk olarak `checkStatus` endpoint'ine istek gönder
      const response = await api.get(
        "https://chess-course-project-backend-with-node-js.onrender.com/auth/status",
        {
          withCredentials: true,
        }
      );
      return response.data; // Eğer başarılıysa, veriyi döndür
    } catch (error) {
      // Eğer `checkStatus` başarısız olursa, refresh token endpoint'ine istek gönder
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await api.post(
            "https://chess-course-project-backend-with-node-js.onrender.com/auth/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          // Refresh başarılıysa, yeniden `checkStatus` endpoint'ine istek gönder
          const retryResponse = await api.get(
            "https://chess-course-project-backend-with-node-js.onrender.com/auth/status",
            {
              withCredentials: true,
            }
          );
          return retryResponse.data;
        } catch (refreshError) {
          // Refresh de başarısız olursa, kullanıcıyı oturum açmaya yönlendirin
          return rejectWithValue("Authentication required");
        }
      }
      // Diğer hatalar için
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    isRegistered: false,
    characterIsVisible: false,
  },
  reducers: {
    checkLoginStatus: (state) => {
      const token = Cookies.get("accessToken");

      if (token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const decodedPayload = JSON.parse(window.atob(base64));

        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedPayload.exp < currentTime) {
          state.isLoggedIn = false; // Token süresi dolmuş
        } else {
          state.isLoggedIn = true; // Geçerli token
        }
      } else {
        state.isLoggedIn = false; // Token yok
      }
    },
    clearUserState: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    resetRegistrationStatus: (state) => {
      state.isRegistered = false;
      state.characterIsVisible = true;
    },
    resetCharacterStatus: (state) => {
      state.characterIsVisible = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.isRegistered = true;
        state.characterIsVisible = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log("Logout başarılı");
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log("Logout başarısız", action.payload);
        state.error = action.payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        Cookies.set("accessToken", action.payload);
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});
export const {
  checkLoginStatus,
  clearUserState,
  resetRegistrationStatus,
  resetCharacterStatus,
} = authSlice.actions;
export default authSlice.reducer;
