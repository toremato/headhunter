<template>
  <div class="the-header">
    <div class="top-nav-container phone:hidden">
      <div class="top-nav-wrapper app-w">
        <div class="top-nav flex text-sm px-default">
          <div class="h-full mr-auto py-auto mr-5 flex items-center">
            <span class="button-link border-dashed border-b border-current">
              Казахстан
            </span>
          </div>
          <!-- <div class="h-full py-auto ml-5 flex items-center">
            <a href="/">Поиск работы</a>
          </div>
          <div class="h-full py-auto ml-5 flex items-center">
            <a href="/" class="button-link">Автоподнятие резюме</a>
          </div> -->
          <div class="h-full py-aut ml-5 flex items-center">
            <router-link to="" class="button-link">
              Хочу у вас работать
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="main-nav-container">
      <div class="main-nav-wrapper app-w">
        <div class="main-nav px-default tablet:text-sm">
          <a href="/">
            <div class="main-logo"></div>
          </a>
          <div class="main-nav-links flex">
            <div class="main-nav-link ml-5 tablet:hidden">
              <router-link to="">Работодателям</router-link>
            </div>
            <div class="main-nav-link ml-5">
              <router-link to="" class="border-dashed border- border-current">
                Помощь
              </router-link>
            </div>
          </div>
          <div class="main-nav-buttons ml-auto h-full flex">
            <div
              id="search-button-wrapper"
              class="h-full flex items-center"
              :class="{ 'hidden-pointer': !searchIsActive }"
            >
              <button
                class="relative flex items-center hover:text-blue-300"
                @click="toggleSearchNav"
              >
                <svg
                  id="magnifying-glass"
                  class="fill-current"
                  viewBox="0 0 192.904 192.904"
                >
                  <path
                    d="M190.707,180.101l-47.078-47.077c11.702-14.072,18.752-32.142,18.752-51.831C162.381,36.423,125.959,0,81.191,0  C36.422,0,0,36.423,0,81.193c0,44.767,36.422,81.187,81.191,81.187c19.688,0,37.759-7.049,51.831-18.751l47.079,47.078  c1.464,1.465,3.384,2.197,5.303,2.197c1.919,0,3.839-0.732,5.304-2.197C193.637,187.778,193.637,183.03,190.707,180.101z M15,81.193  C15,44.694,44.693,15,81.191,15c36.497,0,66.189,29.694,66.189,66.193c0,36.496-29.692,66.187-66.189,66.187  C44.693,147.38,15,117.689,15,81.193z"
                  />
                </svg>
                <span class="phone:hidden ml-1">
                  Поиск
                </span>
              </button>
            </div>
            <div class="h-auto flex items-center">
              <router-link
                to=""
                id="link-cv"
                class="link h-auto border border-opacity-75 px-default hover:border-opacity-100 transition duration-300 phone:hidden"
              >
                Создать резюме
              </router-link>
            </div>
            <div class="h-auto flex items-center">
              <router-link
                to=""
                id="link-login"
                class="link px-default phone:px-0
              border border-opacity-75 border-gray-300  hover:border-gray-100 hover:border-opacity-100 transition duration-300 phone:border-none phone:hover:text-blue-400"
              >
                Войти
              </router-link>
            </div>
            <div class="h-full flex items-center">
              <button
                id="hamburger-menu"
                class="ml-5 hidden phone:block"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-down">
      <search-nav v-if="isSearchPage || searchIsActive"></search-nav>
    </transition>
  </div>
</template>

<script>
import SearchNav from "./SearchNav.vue";

export default {
  components: { SearchNav },
  data() {
    return {
      searchIsActive: false
    };
  },
  computed: {
    isSearchPage() {
      return this.$route.name === "Search";
    }
  },
  methods: {
    toggleSearchNav() {
      if (this.isSearchPage) return;
      this.searchIsActive = !this.searchIsActive;
    }
  }
};
</script>

<style lang="scss" scoped>
.top-nav {
  height: 40px;
  span.button-link {
    line-height: 16px;
  }
}

.main-nav-container {
  background-color: #222;

  .main-nav {
    color: white;
    height: 80px;
    display: flex;
    align-items: center;

    @media (max-width: 700px) {
      height: 60px;
    }
    .main-logo {
      background-image: url(https://i.hh.kz/logos/svg/hh.kz-inversed__min_.svg?v=11032019);
      width: 65px;
      height: 35px;
      // background-position: 50% 50%;
      // background-repeat: no-repeat;
      background-size: 100%;
    }

    .main-nav-links {
      .main-nav-link:first-child {
        margin-left: 30px;
      }
    }

    .main-nav-buttons {
      .link {
        border-radius: 19px;
        line-height: 36px;
      }

      #search-button-wrapper {
        position: relative;
        overflow: hidden;
        &:after {
          content: "";
          position: absolute;
          display: block;
          border-style: solid;
          border-color: transparent;
          pointer-events: none;
          border-width: 0 8px 8px;
          margin-top: -8px;
          margin-left: -3px;
          border-bottom-color: #f9f9f9;
          bottom: 0px;
          left: 9px;
          transition: bottom 0.1s linear;
        }

        &.hidden-pointer:after {
          bottom: -8px;
        }

        #magnifying-glass {
          width: 30px;
          height: 30px;
          padding: 4.45px 4.4px 4.45px 4.3px;
          // padding: 4.45px 4.35px;
          // margin-right: 4px;
        }
      }
      #link-cv {
        color: #9efba1;
        border-color: rgba(158, 251, 161, 0.5);
        margin-left: 20px;

        &:hover {
          border-color: rgb(158, 251, 161);
        }
      }

      #link-login {
        border-color: rgba(255, 255, 255, 0.5);
        margin-left: 10px;

        @media (max-width: 700px) {
          margin-left: 20px;
          transition-duration: 0s;
        }
        &:hover {
          border-color: white;
        }
      }

      #hamburger-menu {
        width: 30px;
        height: 30px;
        background-image: url(https://i.hh.kz/css/globals/blocks/supernova/images/mobile__min_.svg);
        background-position: 0 0;
        &:hover,
        &:active {
          background-position: -30px 0;
        }
      }
    }
  }
}
</style>
