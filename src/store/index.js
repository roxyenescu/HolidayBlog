import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/firebaseInit';

export default createStore({
  state: {
    sampleBlogCards: [
      { blogTitle: "Venice Holiday", blogCoverPhoto: "venice-holiday", blogDate: "Sep 25, 2023" },
      { blogTitle: "London Holiday", blogCoverPhoto: "london-holiday", blogDate: "Nov 6, 2023" },
      { blogTitle: "Dubai Holiday", blogCoverPhoto: "dubai-holiday", blogDate: "Dec 24, 2023" },
      { blogTitle: "Norway Holiday", blogCoverPhoto: "norway-holiday", blogDate: "Ian 4, 2024" }
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const dbResults = await getDoc(userRef);
        if (dbResults.exists()) {
          commit("setProfileInfo", dbResults);
          commit("setProfileInitials");
          console.log(dbResults);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user!");
      }
    }
  },
  modules: {
  }
})
