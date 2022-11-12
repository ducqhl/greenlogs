<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost
      v-for="(post, index) in sampleBlogPost"
      :post="post"
      :key="index"
    />
    <recent-blog-cards :sampleBlogCards="sampleBlogCards" />
    <div class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#"
          >Register for GreenLogs <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import Arrow from "../assets/images/Icons/arrow-right-light.svg";
import RecentBlogCards from "../components/RecentBlogCards.vue";

export default {
  name: "HomeVue",
  components: { BlogPost, Arrow, RecentBlogCards },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogHtml:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        buttonText: "Login/Register",
        photo: "src/assets/images/blogPhotos/coding.jpg",
      },
      sampleBlogPost: [
        {
          title: "Sample 1",
          blogHtml: "Weekly blog articles with all things programming i",
          photo: "src/assets/images/blogPhotos/designed-for-everyone.jpg",
        },
        {
          title: "Sample 2",
          blogHtml: "Weekly blog articles with all things programming i",
          photo: "src/assets/images/blogPhotos/beautiful-stories.jpg",
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return this.$store.state.sampleBlogCards;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .blog-card-wrapper {
    padding: 80px 16px;

    @media (min-width: 500px) {
      padding: 100px 16px;
    }
  }

  .updates {
    .container {
      padding: 100px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      @media (min-width: 800px) {
        padding: 125px 25px;
        flex-direction: row;
      }

      h2 {
        font-weight: 300;
        font-size: 32px;
        max-width: 425px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;

        @media (min-width: 800px) {
          text-align: initial;
          font-size: 40px;
        }
      }

      .router-button {
        font-size: 14px;
        display: flex;
        text-decoration: none;
        margin-top: 25px;

        @media (min-width: 800px) {
        }
      }
    }
  }
}
</style>
