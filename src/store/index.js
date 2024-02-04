import { createStore } from 'vuex';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc, collection, query, orderBy, getDocs, deleteDoc } from 'firebase/firestore';
import db from '../firebase/firebaseInit';

export default createStore({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "",
    images: [],
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
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    }
  },
  mutations: {
    setPosts(state, postData) {
      state.blogPosts.push(postData);
    },
    setPostLoaded(state, loaded) {
      state.postLoaded = loaded;
    },
    updateImages(state, payload) {
      state.images = payload;
    },
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
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
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
    updateImagesAction({ commit }, payload) {
      commit('updateImages', payload);
    },
    async getPost({ commit, state }) {
      const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
      
      try {
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!state.blogPosts.some(post => post.blogID === doc.id)) {
            const postData = {
              blogID: doc.id,
              blogHTML: data.blogHTML,
              blogCoverPhoto: data.blogCoverPhoto,
              blogTitle: data.blogTitle,
              blogDate: data.date,
              images: data.images || [],
            };
            commit('setPosts', postData);
            console.log(postData);
          }
        });

        commit('setPostLoaded', true);
       
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async deletePost({ commit }, payload) {
      const postRef = doc(db, 'blogPosts', payload);
  
      try {
        // Get the document to check if it exists
        const postDoc = await getDoc(postRef);
  
        if (postDoc.exists()) {
          // Document exists, proceed with deletion
          await deleteDoc(postRef);
          commit("filterBlogPost", payload);
        } else {
          console.error('Document does not exist.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
  },
  modules: {
  }
})
