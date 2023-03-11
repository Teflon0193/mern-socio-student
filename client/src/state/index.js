import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",    //this gonna represent Dark & Light Mode
  user: null,
  token: null,
  posts: [],    // will include all the post we need
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  /*These are functions that will modify the global state*/
  reducers: {
    setMode: (state) => {             // this gonna be changing from light Mode to Dark Mode
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {          // this will be the action when you login
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {       //this will be the action when you logout
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {                 //if the user exist we gonna set our friends
        state.user.friends = action.payload.friends;
      } else {                            // otherwise
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {         // this is the posts action
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
