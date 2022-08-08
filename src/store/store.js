import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../redux/createBlogSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
  },
});
