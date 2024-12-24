import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import lessonReducer from "./slices/lessonSlice";
import userReducer from "./slices/userSlice";
import articleReducer from "./slices/articleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
    user: userReducer,
    article: articleReducer,
  },
});
