<template>
  <div class="blog-cards-wrapper">
    <div class="blog-cards-container container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPostMode" />
      </div>
      <div class="blog-cards">
        <BlogCard v-for="post in blogPosts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
import { MUTATIONS } from "../stores";

export default {
  name: "vue-blogs",
  components: { BlogCard },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    editPostMode: {
      get() {
        return this.$store.state.editPostMode;
      },
      set(payload) {
        return this.$store.commit(MUTATIONS.TOGGLE_EDIT_POST, payload);
      },
    },
    // profileAdmin() {
    //   return this.$store.state.profileAdmin;
    // },
  },
  beforeUnmount() {
    this.$store.commit(MUTATIONS.TOGGLE_EDIT_POST, false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards-wrapper {
  padding: 80px 16px;
  background-color: #f1f1f1;
  position: relative;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards-container {
    position: relative;

    .toggle-edit {
      display: flex;
      align-items: center;
      position: absolute;
      top: -70px;
      right: 0;
      span {
        margin-right: 16px;
      }
      input[type="checkbox"] {
        position: relative;
        border: none;
        appearance: none;
        background: #fff;
        outline: none;
        width: 80px;
        height: 30px;
        border-radius: 20px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      input[type="checkbox"]:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: #303030;
        transform: scale(1.1);
        transition: 750ms ease all;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      input:checked[type="checkbox"]:before {
        background: #fff;
        left: 52px;
      }
    }

    .blog-cards {
      display: grid;
      gap: 32px;
      grid-template-columns: 1fr;

      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
}
</style>
