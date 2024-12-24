import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const createLesson = createAsyncThunk(
  "lessons/createLesson",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "https://chess-course-project-backend-with-node-js.onrender.com/lessons",
        credentials,
        {
          withCredentials: true, // Cookies ile çalışmak için gerekli
        }
      );

      const { lessonName } = response.data;
      return `${lessonName} was created.`;
    } catch (error) {
      console.error("Ders oluşturma işlemi sırasında hata: ", error);
      if (error.response) {
        console.error("Sunucudan gelen hata: ", error.response.data);
        return rejectWithValue(error.response.data.message);
      } else if (error.request) {
        return rejectWithValue("No response received from server.");
      } else {
        return rejectWithValue("Creating lesson failed. Please try again.");
      }
    }
  }
);
export const getAllLessons = createAsyncThunk(
  "lessons/getAllLessons",
  async () => {
    const response = await api.get(
      "https://chess-course-project-backend-with-node-js.onrender.com/lessons"
    );
    return response.data;
  }
);

export const getLesson = createAsyncThunk(
  "lessons/getLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/lessons/${lessonId}`
      );
      console.log("API Response:", response.data); // Konsola yazdır

      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLessonsToLevel = createAsyncThunk(
  "lessons/getLessonToLevel",
  async (lessonLevel) => {
    const response = await api.get(
      `https://chess-course-project-backend-with-node-js.onrender.com/lessons?lessonLevel=${lessonLevel}`
    );
    return response.data;
  }
);

export const completeLesson = createAsyncThunk(
  "lessons/completeLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/${lessonId}/complete`
      );
      console.log("API Response:", response.data); // Konsola yazdır

      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const lessonIsCompleted = createAsyncThunk(
  "lessons/lessonIsCompleted",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/users/${lessonId}/lessonIsComplete`
      );
      return response.data.isCompleted;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "users/deleteLesson",
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `https://chess-course-project-backend-with-node-js.onrender.com/lessons/${lessonId}`
      );
      console.log("API Response:", response.data);
      return lessonId;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    lessons: [],
    lesson: {
      lessonName: "",
      lessonDesc: "",
      lessonContent: {
        sections: [],
      },
      lessonTest: [], // Boş dizi olarak sıfırla
    },
    lessonLevel: null,
    isLoading: false,
    isLoadingHomeLesson: false,
    isCompleted: null,
    completedLessons: [],
  },
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    clearLessonState: (state) => {
      (state.lesson = {
        lessonName: "",
        lessonDesc: "",
        lessonContent: {
          sections: [],
        },
        lessonTest: [], // Boş dizi olarak sıfırla
      }),
        (state.isCompleted = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.lesson = action.payload;
        state.isLoading = false;
      })
      .addCase(getLesson.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllLessons.pending, (state) => {
        state.isLoading = true;
        state.isLoadingHomeLesson = true;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.isLoading = false;
        state.isLoadingHomeLesson = false;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingHomeLesson = false;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lessons = state.lessons.filter(
          (lesson) => lesson._id !== action.payload
        );
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getLessonsToLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLessonsToLevel.fulfilled, (state, action) => {
        state.lessons = action.payload;
        state.isLoading = false;
      })
      .addCase(getLessonsToLevel.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(completeLesson.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeLesson.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(lessonIsCompleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(lessonIsCompleted.fulfilled, (state, action) => {
        state.isCompleted = action.payload;
        state.isLoading = false;
      })
      .addCase(lessonIsCompleted.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { clearLessonState } = lessonSlice.actions;

export default lessonSlice.reducer;
