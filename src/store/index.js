import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import db from '../firebase/firebaseInit';

export default createStore({
  state: {
    sampleBlogCards: [
      { blogTitle: "Venice Holiday", blogCoverPhoto: "venice-holiday", blogDate: "Sep 25, 2023" },
      { blogTitle: "London Holiday", blogCoverPhoto: "london-holiday", blogDate: "Nov 6, 2023" },
      { blogTitle: "Dubai Holiday", blogCoverPhoto: "dubai-holiday", blogDate: "Dec 24, 2023" },
      { blogTitle: "Norway Holiday", blogCoverPhoto: "norway-holiday", blogDate: "Ian 4, 2024" }
    ],
    blogHTML: "orice scrie",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
      console.log(state.blogHTML);
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
      console.log(state.blogTitle);
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
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
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
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

          const token = await user.getIdTokenResult();
          const admin = await token.claims.admin;
          commit('setProfileAdmin', admin);

          console.log("Este admin: " + admin);
          console.log("Token: " + token.claims.user_id);
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user!");
      }
    },
    async updateUserSettings({ commit, state }) {
      const db = getFirestore(); // Obțin instanța Firestore
      const userRef = doc(db, 'users', state.profileId); // Referință către documentul utilizatorului

      try {
        await updateDoc(userRef, {
          firstName: state.profileFirstName,
          lastName: state.profileLastName,
          username: state.profileUsername,
        });
        commit("setProfileInitials");
      } catch (error) {
        console.error("Eroare la actualizarea setărilor utilizatorului:", error);
      }
    },
  },
  modules: {
  }
})
