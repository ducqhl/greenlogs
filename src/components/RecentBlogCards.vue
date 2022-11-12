<template>
  <div class="blog-card-wrapper">
    <div class="container">
      <h3 v-show="!hideTitle">View More Recent Blogs</h3>
      <div class="blog-cards">
        <BlogCard v-for="post in sampleBlogCards" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from "./BlogCard.vue";

export default {
  name: "recent-blog-cards",
  components: {
    BlogCard,
  },
  props: ["sampleBlogCards", "hideTitle"],
};
</script>

<style lang="scss" scoped>
.blog-card-wrapper {
  position: relative;
  background: #f1f1f1;

  h3 {
    font-weight: 300;
    font-size: 1.75rem;
    margin-bottom: 2rem;
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
</style>
