<template>
  <div class="blog-wrapper" :class="{ 'no-user': !user }">
    <div class="blog-content">
      <div>
        <h2>{{ post.title }}</h2>
        <p class="content-preview" v-html="post.html" />
        <router-link
          class="link"
          :class="{ 'link-light': isWelcomePost }"
          :to="{
            name: this.isWelcomePost
              ? ROUTE_NAMES.LOGIN
              : ROUTE_NAMES.VIEW_BLOG,
            params: { blog_id: this.post.id },
          }"
        >
          {{ post.buttonText || "View the Post" }}
          <Arrow class="arrow" :class="{ 'arrow-light': isWelcomePost }" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img :src="post.photoFileURL" :alt="post.title" />
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/images/Icons/arrow-right-light.svg";
import { ROUTE_NAMES } from "../router";

export default {
  name: "BlogPost",
  props: ["post", "linkLight", "isWelcomePost"],
  components: {
    Arrow,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    ROUTE_NAMES() {
      return ROUTE_NAMES;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 4;
    order: 2;

    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;

        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 0.8rem;
        max-height: 10rem;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 2rem;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;
        color: #000000;

        &:hover {
          border-bottom-color: #303030;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:first-child {
    .blog-content {
      .content-preview {
        max-height: 9.5rem;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .link-light {
      color: #ffffff !important;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }

    .blog-photo {
      order: 1;
    }

    .link-light {
      &:hover {
        border-bottom-color: #ffffff;
      }
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
