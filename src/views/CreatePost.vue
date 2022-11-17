<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blog.isOnPhotoReview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        {{ this.errorMsg }}
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !blog.photoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ blog.photoName }}</span>
        </div>
      </div>
      <div class="editor">
        <QuillEditor
          theme="snow"
          v-model:content="blogHTML"
          contentType="html"
          :modules="modules"
          toolbar="full"
          placeholder="Edit blog content here"
        />
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link
          class="router-button"
          :to="{ name: ROUTE_NAMES.BLOG_PREVIEW }"
          >Post Preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { collection, doc, setDoc } from "@firebase/firestore";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Loading from "../components/Loading.vue";
import { ACTIONS, MUTATIONS } from "../stores";
import firebase, { COLLECTIONS, storage } from "../firebase";
import { ROUTE_NAMES } from "../router";

import { QuillEditor } from "@vueup/vue-quill";
import ImageUploader from "quill-image-uploader";

export default {
  name: "CreatePost",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
    };
  },
  components: {
    BlogCoverPreview,
    Loading,
    QuillEditor,
  },
  setup: () => {
    const modules = {
      name: "imageUploader",
      module: ImageUploader,
      options: {
        upload: (file) => {
          return new Promise(async (resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            try {
              const storageRef = ref(
                storage,
                `${COLLECTIONS.DOCUMENTS_BLOG_POST_PHOTOS}/${file.name}`
              );

              await uploadBytes(storageRef, file);
              const downloadURL = await getDownloadURL(storageRef);
              resolve(downloadURL);
            } catch (error) {
              console.error(error);
              reject(error);
            }
          });
        },
      },
    };

    return { modules };
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const photoName = this.file.name;
      const photoFileURL = URL.createObjectURL(this.file);

      this.$store.commit(MUTATIONS.SET_POST, {
        ...this.$store.state.blog,
        photoName,
        photoFileURL,
      });
    },
    showError(message) {
      this.error = true;
      this.errorMsg = message;
      setTimeout(() => (this.error = false), 5000);
    },
    openPreview() {
      this.$store.commit(MUTATIONS.TOGGLE_PHOTO_PREVIEW);
    },

    async uploadBlog() {
      if (!this.blogTitle?.length || !this.blogHTML?.length) {
        this.showError("Please ensure Blog Title & Blog Post has been filled!");
        return;
      }

      if (!this.file) {
        return this.showError("Please ensure Cover Photo has been uploaded!");
        return;
      }

      this.loading = true;

      const storageRef = ref(
        storage,
        `${COLLECTIONS.DOCUMENTS_BLOG_COVER_PHOTOS}/${this.$store.state.blog.photoName}`
      );

      try {
        await uploadBytes(storageRef, this.file);
        const downloadURL = await getDownloadURL(storageRef);
        const timestamp = Date.now();
        const docRef = doc(collection(firebase, COLLECTIONS.BLOG_POSTS));

        await setDoc(docRef, {
          id: docRef.id,
          html: this.blogHTML,
          photoFileURL: downloadURL,
          photoName: this.blogPhotoName,
          title: this.blogTitle,
          profileId: this.profileId,
          date: timestamp,
        });

        await this.$store.dispatch(ACTIONS.GET_POSTS);
        await this.$store.commit(MUTATIONS.RESET_POST);

        this.$router.push({
          name: ROUTE_NAMES.VIEW_BLOG,
          params: { blog_id: docRef.id },
        });
      } catch (error) {
        this.showError(error?.message ?? error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES;
    },
    profileId() {
      return this.$store.state.profile.id;
    },
    blogPhotoName() {
      return this.$store.state.blog.photoName;
    },
    blog() {
      return this.$store.state.blog;
    },
    blogTitle: {
      get() {
        return this.$store.state.blog.title;
      },
      set(payload) {
        this.$store.commit(MUTATIONS.SET_POST, {
          ...this.$store.state.blog,
          title: payload,
        });
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blog.html;
      },
      set(payload) {
        this.$store.commit(MUTATIONS.SET_POST, {
          ...this.$store.state.blog,
          html: payload,
        });
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

  label,
  button,
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
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
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

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
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
