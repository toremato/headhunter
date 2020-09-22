<template>
  <!-- <transition name="slide-down"> -->
  <div class="search-nav-container flex flex-col">
    <div class="search-nav-wrapper app-w">
      <!-- <div class="search-nav"> -->
      <div class="search-form-wrapper my-5 px-default">
        <form class="flex" @submit.prevent="onSubmit">
          <div class="search-input-wrapper">
            <input
              ref="searchInput"
              type="text"
              placeholder="Профессия, должность или компания"
              v-model="searchInput"
            />
          </div>
          <div class="search-button-wrapper">
            <button>
              <span class="search-label phone:hidden">Найти</span>
              <span class="search-icon hidden phone:flex"></span>
            </button>
          </div>
        </form>
      </div>
      <div v-if="isSearchPage" class="search-tabs px-default flex phone:hidden">
        <div class="search-tab search-tab__active">Вакансии</div>
        <div class="search-tab">Резюме</div>
        <div class="search-tab">Компании</div>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  data() {
    return {
      searchInput: ""
    };
  },
  created() {
    if (this.isSearchPage && this.$route.query.text) {
      this.searchInput = this.$route.query.text;
    }

    this.$nextTick(() => {
      this.$refs.searchInput.focus();
    });
  },
  computed: {
    isSearchPage() {
      return this.$route.name === "Search";
    }
  },
  methods: {
    onSubmit() {
      this.$router.push("/search?text=" + this.searchInput);
      // this.$router.push({path: "/search"});
    }
  }
};
</script>

<style lang="scss" scoped>
.search-nav-container {
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-start;

  .search-form-wrapper {
    font-size: 14px;
    width: 800px;

    @media (max-width: 1339px) {
      width: 720px;
    }
    @media (max-width: 1023px) {
      width: 400px;
    }
    @media (max-width: 699px) {
      width: 100%;
    }

    .search-input-wrapper {
      // flex: 1 0 auto;
      width: 100%;

      input {
        width: 100%;
        color: #333;
        height: 38px;
        line-height: 36px;
        border: 1px solid #cbd1d4;
        padding-left: 11px;
        padding-right: 34px;

        &:focus {
          border-color: #0f8fee;
          outline: none;
          box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.1235);
        }
      }
    }

    .search-button-wrapper {
      // flex: 0 0 100px;

      button {
        color: #fff;
        border: 1px solid;
        border-color: #0f8fee;
        background-color: #0f8fee;
        height: 38px;
        padding: 0 15px;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
          box-shadow 0.2s ease-in-out;

        &:hover {
          background-color: #0e81d6;
          border-color: #0e81d6;
        }

        &:active {
          background-color: #0c72be;
          box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.1235);
        }

        .search-label {
          width: 100px;
        }

        .search-icon {
          width: 30px;
          height: 30px;
          margin: 0 -10px;
          background-image: url(https://i.hh.kz/css/globals/blocks/supernova/images/search__min_.svg);
        }
      }
    }
  }

  .search-tabs {
    font-size: 14px;

    .search-tab {
      margin-right: 25px;
      padding-bottom: 10px;
      position: relative;
      cursor: pointer;

      &__active {
        cursor: default;
      }
      &__active::before {
        display: block;
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #8cb900;
      }
    }
  }
}
</style>
