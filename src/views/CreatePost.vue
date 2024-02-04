<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label class="blog-photo-label" for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, .jpeg" />
          <button @click="openPreview" class="preview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview
            Photo</button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>

      <div class="editor-container">
        <div class="editor-settings">
          <img :src="bold" @click="applyBold" class="icon" />
          <img :src="italic" @click="applyItalic" class="icon" />
          <img :src="underline" @click="applyUnderline" class="icon" />
        </div>

        <div class="editor-frame">
          <textarea id="blog-text" placeholder="Enter Blog Text Here..." v-model="blogHTML"
            @added-image="imageHandler"></textarea>
        </div>

        <div class="card">
          <div class="top">
            <p>Drag & drop images</p>
          </div>
          <div class="drag-area" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
            <span v-if="!isDragging">
              Drag & drop image here or
              <span class="select" role="button" @click="selectFiles">Choose</span>
            </span>
            <div v-else class="select">Drop images here</div>
            <input name="file" type="file" class="file" ref="fileInput" multiple @change="onFileSelect" />
          </div>
          <div class="container-images">
            <div class="image" v-for="(image, index) in images" :key="index">
              <span class="delete" @click="deleteImage(index)">&times;</span>
              <img :src="image.url" />
            </div>
          </div>
          <button type="button" @click="uploadPhotos">Upload in blog</button>
        </div>
      </div>

      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "../firebase/firebaseInit";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import firebase from "firebase/app";
import { collection, getFirestore, doc, setDoc } from 'firebase/firestore';

import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import Loading from '../components/Loading.vue';
import bold from '../assets/Icons/text-bold-svgrepo-com.svg';
import italic from '../assets/Icons/text-italic-svgrepo-com.svg';
import underline from '../assets/Icons/text-underline-svgrepo-com.svg';

export default {
  name: "CreatePost",
  setup() {
    return {
      bold,
      italic,
      underline,
    }
  },
  components: {
    BlogCoverPreview,
    Loading
  },
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      images: [],
      isDragging: false,
      loading: null,
    };
  },
  methods: {
    uploadPhotos() {
      // Parcurg lista de imagini și încarc fiecare în storage
      this.images.forEach((image, index) => {
        const storageRef = ref(storage, `blogPostPhotos/${image.name}`);
        uploadBytes(storageRef, this.$refs.fileInput.files[index]).then(
          (snapshot) => {
            console.log(`Image ${index + 1} uploaded`, snapshot);

            // Actualizez variabila "images" în starea Vuex
            this.$store.dispatch('updateImagesAction', this.images);
          }
        );
      });
    },
    selectFiles() {
      this.$refs.fileInput.click();
    },
    onFileSelect(event) {
      const files = event.target.files;
      if (files.length === 0) return;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] != "image") continue;
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({ name: files[i].name, url: URL.createObjectURL(files[i]) });
        }
      }
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    onDragOver(event) {
      event.preventDefault();
      event.isDragging = true;
      event.dataTransfer.dropEffect = "copy";
    },
    onDragLeave(event) {
      event.preventDefault();
      this.isDragging = false;
    },
    onDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] != "image") continue;
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({ name: files[i].name, url: URL.createObjectURL(files[i]) });
        }
      }
    },
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    openPreview() {
      this.$store.commit("openPhotoPreview");
    },
    async uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML !== 0) {
        if (this.file) {
          this.loading = true; 

          const storage = getStorage();
          const storageRef = ref(storage, `documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);

          try {
            // Upload cover photo to storage
            await uploadBytes(storageRef, this.file);

            // Get download URL of the uploaded cover photo
            const downloadURL = await getDownloadURL(storageRef);
            const timestamp = Date.now();

            // Get Firestore instance
            const firestore = getFirestore();

            // Create a reference to the "blogPosts" collection
            const newCollectionRef = collection(firestore, 'blogPosts');

            // Create a reference to a new document with an auto-generated ID
            const newDocRef = doc(newCollectionRef);

            await setDoc(newDocRef, {
              blogID: newDocRef.id,
              blogHTML: this.blogHTML,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: this.blogCoverPhotoName,
              blogTitle: this.blogTitle,
              profileId: this.profileId,
              date: timestamp,
              images: this.images.map(image => ({ name: image.name, url: image.url })),
            });

            this.loading = false;
            this.$router.push({ name: "ViewBlog" });
          } catch (error) {
            console.error(error);
            this.loading = false;
          }
        } else {
          this.error = true;
          this.errorMsg = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      } else {
        this.error = true;
        this.errorMsg = "Please ensure Blog Title and Blog Post have been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);

      },
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  button,
  .blog-photo-label,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: .5s ease-in-out all;
      padding: 10px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .editor-settings {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      .icon {
        width: 40px;
        height: auto;
        cursor: pointer;
        font-size: 24px;
        margin-left: 10px;
      }
    }

    .editor-frame {
      height: 90%;
      padding: 5px;
      width: 100%;
      margin-top: 16px;

      textarea {
        width: 100%;
        height: 80%;
        resize: none;
        overflow-y: scroll;
      }
    }

    .card {
      width: 50%;
      height: 50%;
      padding: 10px;
      box-shadow: 0 0 5px #fff;
      border-radius: 5px;
      overflow: hidden;
      align-self: flex-start;

      .top {
        text-align: left;

        p {
          font-weight: bold;
          color: red;
        }
      }

      button {
        outline: 0;
        border: 0;
        color: #fff;
        border-radius: 4px;
        font-weight: 400;
        padding: 8px 13px;
        background: red;
        width: 30%;
      }

      .drag-area {
        height: 20%;
        border-radius: 5px;
        border: 2px dashed red;
        background: #fff;
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: center;
        -webkit-user-select: none;
        margin-top: 10px;

        .visible {
          font-size: 18px;
        }
      }

      .select {
        color: #5256ad;
        margin-left: 5px;
        cursor: pointer;
        transition: 0.4s;

        &:hover {
          opacity: 0.6;
        }
      }

      .container-images {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        max-height: 200px;
        position: relative;
        margin-bottom: 8px;
        padding-top: 15px;


        .image {
          width: 75px;
          margin-right: 5px;
          height: 75px;
          position: relative;
          margin-bottom: 8px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }

          span {
            position: absolute;
            top: -2px;
            right: 9px;
            font-size: 20px;
            cursor: pointer;
          }

          .delete {
            z-index: 999;
            color: red;
          }
        }

      }

      input,
      .drag-area .on-drop,
      .drag-area.dragover .visible {
        display: none;
      }
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>