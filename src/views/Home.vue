<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" isWelcomePost="true" />
    <BlogPost
      v-for="(post, index) in blogPostsFeed"
      :post="post"
      :key="post.id"
    />
    <recent-blog-cards
      class="recent-blog-cards"
      :blogPostsCards="blogPostsCards"
    />
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: ROUTE_NAMES.LOGIN }"
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
import { ROUTE_NAMES } from "../router";

export default {
  name: "HomeVue",
  components: { BlogPost, Arrow, RecentBlogCards },
  data() {
    return {
      welcomeScreen: {
        id: "welcome",
        title: "Welcome!",
        html: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        buttonText: "Login/Register",
        photoFileURL: "src/assets/images/blogPhotos/coding.jpg",
      },
      sampleBlogPost: [
        {
          title: "Sample 1",
          html: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
          photoFileURL:
            "src/assets/images/blogPhotos/designed-for-everyone.jpg",
        },
        {
          title: "Sample 2",
          html: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
          photoFileURL: "src/assets/images/blogPhotos/beautiful-stories.jpg",
        },
      ],
      sampleBlogCards: [
        {
          id: "1",
          title: "Blog Card #1",
          photoFileURL: "src/assets/images/blogCards/stock-1.jpg",
          date: "May 1, 2022",
        },
        {
          id: "2",
          title: "Blog Card #2",
          photoFileURL: "src/assets/images/blogCards/stock-2.jpg",
          date: "May 1, 2022",
        },
        {
          id: "3",
          title: "Blog Card #3",
          photoFileURL: "src/assets/images/blogCards/stock-3.jpg",
          date: "May 1, 2022",
        },
        {
          id: "4",
          title: "Blog Card #4",
          photoFileURL: "src/assets/images/blogCards/stock-4.jpg",
          date: "May 1, 2022",
        },
      ],
    };
  },
  computed: {
    ROUTE_NAMES() {
      return ROUTE_NAMES;
    },
    blogPostsFeed() {
      debugger;
      // get first two blogs
      if (this.$store.state.blogPosts?.length > 2) {
        console.log(this.$store.state.blogPosts.slice(0, 2));
        return this.$store.state.blogPosts.slice(0, 2);
      } else if (this.$store.state.blogPosts?.length > 0) {
        return this.$store.state.blogPosts;
      }

      return this.sampleBlogPost;
    },
    blogPostsCards() {
      // get five blogs expect two first blogs
      if (this.$store.state.blogPosts?.length > 6) {
        return this.$store.state.blogPosts.slice(2, 6);
      } else if (this.$store.state.blogPosts?.length > 2) {
        return this.$store.state.blogPosts.slice(2);
      }

      return this.sampleBlogCards;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .recent-blog-cards {
    background: #f1f1f1;
    padding: 40px 16px;

    @media (min-width: 500px) {
      padding: 80px 16px;
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
