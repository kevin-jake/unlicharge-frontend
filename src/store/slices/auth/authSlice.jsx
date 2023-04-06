import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  mode: "dark",
  user: null,
  isTermsOpen: false,
  isPrivacyOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      toast.info("You have been logged out", { autoClose: 10000 });
    },
    setIsTermsOpen: (state, action) => {
      state.isTermsOpen = action.payload;
    },
    setIsPrivacyOpen: (state, action) => {
      state.isPrivacyOpen = action.payload;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts.reverse();
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts.reverse();
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setIsPrivacyOpen,
  setIsTermsOpen,
  setFriends,
  setPosts,
  setPost,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const isTermsOpen = (state) => state.auth.isTermsOpen;
export const isPrivacyOpen = (state) => state.auth.isPrivacyOpen;
export const selectMode = (state) => state.auth.mode;

export default authSlice.reducer;
