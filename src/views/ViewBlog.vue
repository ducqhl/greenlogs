<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog?.title }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentBlog?.date).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <img :src="this.currentBlog?.photoFileURL" alt="" />
      <div class="post-content ql-editor" v-html="this.currentBlog?.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = this.$store.state.blogPosts.find(
      (post) => post.id === this.$route.params.blog_id
    );
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
