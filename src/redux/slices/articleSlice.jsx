import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api/axios";

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "https://chess-course-project-backend-with-node-js.onrender.com/articles",
        credentials,
        {
          withCredentials: true, // Cookies ile çalışmak için gerekli
        }
      );

      const { articleName } = response.data;
      return `${articleName} was created.`;
    } catch (error) {
      console.error("Makale oluşturma işlemi sırasında hata: ", error);
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

export const getAllArticles = createAsyncThunk(
  "articles/getAllArticles",
  async () => {
    const response = await api.get(
      "https://chess-course-project-backend-with-node-js.onrender.com/articles"
    );
    return response.data;
  }
);

export const getArticle = createAsyncThunk(
  "articles/getarticle",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `https://chess-course-project-backend-with-node-js.onrender.com/articles/${articleId}`
      );
      console.log("API Response:", response.data); // Konsola yazdır

      return response.data;
    } catch (error) {
      console.error("API Hatası:", error.response?.data || error.message);
      return rejectWithValue(error.response.data);
    }
  }
);
const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    article: {
      articleName: "",
      articleDesc: "",
      articleContent: {
        sections: [],
      },
    },
    isLoadingArticle: false,
  },
  reducers: {
    clearArticleState: (state) => {
      state.article = {
        articleName: "",
        articleDesc: "",
        articleContent: {
          sections: [],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllArticles.pending, (state) => {
        state.isLoadingArticle = true;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.isLoadingArticle = false;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.isLoadingArticle = false;
      })
      .addCase(getArticle.pending, (state) => {
        state.isLoadingArticle = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.article = action.payload;
        state.isLoadingArticle = false;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.isLoadingArticle = false;
      });
    //   .addCase(deleteLesson.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteLesson.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.lessons = state.lessons.filter(
    //       (lesson) => lesson._id !== action.payload
    //     );
    //   })
    //   .addCase(deleteLesson.rejected, (state, action) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(getLessonsToLevel.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getLessonsToLevel.fulfilled, (state, action) => {
    //     state.lessons = action.payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(getLessonsToLevel.rejected, (state, action) => {
    //     state.error = action.payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(completeLesson.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(completeLesson.fulfilled, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(lessonIsCompleted.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(lessonIsCompleted.fulfilled, (state, action) => {
    //     state.isCompleted = action.payload;
    //     state.isLoading = false;
    //   })
    //   .addCase(lessonIsCompleted.rejected, (state, action) => {
    //     state.isLoading = false;
    //   });
  },
});
export const { clearArticleState } = articleSlice.actions;

export default articleSlice.reducer;
