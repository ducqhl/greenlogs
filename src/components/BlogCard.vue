<template>
  <div class="blog-card">
    <div class="icons" v-show="editPostMode">
      <div @click="editBlog" class="icon">
        <Edit class="edit" />
      </div>
      <div @click="deleteBlog" class="icon">
        <Delete class="delete" />
      </div>
    </div>
    <img :src="post.photo" alt="" />
    <div class="info">
      <h4>{{ post.title }}</h4>
      <h6>
        Posted on:
        {{ new Date(post.date).toLocaleString("en-us", { dateStyle: "long" }) }}
      </h6>
      <p>View The Post <Arrow class="arrow" /></p>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/images/icons/arrow-right-light.svg";
import Edit from "../assets/images/icons/edit-regular.svg";
import Delete from "../assets/images/icons/trash-regular.svg";
import { ROUTE_NAMES } from "../router";
import { ACTIONS } from "../stores";

export default {
  name: "blogCard",
  props: ["post"],
  components: {
    Arrow,
    Edit,
    Delete,
  },
  computed: {
    editPostMode() {
      return this.$store.state.editPostMode;
    },
  },
  methods: {
    deleteBlog() {
      this.$store.dispatch(ACTIONS.DELETE_POST, this.post.id);
    },
    editBlog() {
      this.$router.push({
        name: ROUTE_NAMES.EDIT_BLOG,
        params: { blog_id: this.post.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-2deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      color: #000000;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          color: #ffffff;
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      svg.edit,
      svg.delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;
    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }
    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }
    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;
      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }
      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
