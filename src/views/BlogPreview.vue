<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ this.blog.title }}</h2>
      <img :src="blog.photoFileURL" alt="" />
      <div class="post-content ql-editor" v-html="blog.html"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPreview",
  data() {
    return {
      blog,
    };
  },
  async mounted() {
    this.blog = await this.$store.state.blogPosts.find(
      (post) => post.id === this.$route.params.blog_id
    );
  },
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>
