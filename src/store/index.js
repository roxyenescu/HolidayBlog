import { createStore } from 'vuex'

export default createStore({
  state: {
    sampleBlogCards: [
      { blogTitle: "Venice Holiday", blogCoverPhoto: "venice-holiday", blogDate: "Sep 25, 2023" },
      { blogTitle: "London Holiday", blogCoverPhoto: "london-holiday", blogDate: "Nov 6, 2023" },
      { blogTitle: "Dubai Holiday", blogCoverPhoto: "dubai-holiday", blogDate: "Dec 24, 2023" },
      { blogTitle: "Norway Holiday", blogCoverPhoto: "norway-holiday", blogDate: "Ian 4, 2024" }
    ],
    editPost: null,
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    }
  },
  actions: {
  },
  modules: {
  }
})
