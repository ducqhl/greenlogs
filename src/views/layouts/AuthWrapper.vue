<template>
  <div class="auth-wrapper">
    <div class="form-wrapper">
      <slot />
      <div class="angle"></div>
    </div>
    <div class="background"></div>
  </div>
  <Loading v-if="isLoading" />
</template>

<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "auth-wrapper",
  props: {
    isLoading: Boolean,
  },
  components: { Loading },
};
</script>

<style lang="scss">
.auth-wrapper {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  position: relative;

  @media (min-width: 900px) {
    width: 100%;
  }

  .form-wrapper {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      .login-register {
        margin-bottom: 32px;

        .router-link {
          color: #000;
        }
      }

      h2 {
        text-align: center;
        font-size: 32px;
        color: #303030;
        margin-bottom: 40px;
        max-width: 400px;

        @media (min-width: 900px) {
          font-size: 40px;
        }
      }

      .inputs {
        width: 100%;
        max-width: 350px;

        .input {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;

          input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 4px 4px 4px 40px;
            height: 50px;

            &:focus {
              outline: none;
            }
          }

          .icon {
            width: 12px;
            position: absolute;
            left: 14px;
          }
        }

        .error {
          margin: 0.5rem 0;
        }
      }

      button {
        margin: 1rem;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 80px;
      right: -40px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("@/assets/images/background.png");
    width: 100%;
    height: 100%;

    @media (max-width: 1200px) {
      flex: 1;
    }

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
