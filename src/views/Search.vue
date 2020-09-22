<template>
  <div class="app-w">
    <!-- <div class="px-default"> -->
    <div class="search-heading px-default">
      <!-- <div class="-mt-px"> -->
      <h1 class="phone:hidden">{{ searchHeading }}</h1>
      <!-- </div> -->
      <div class="hidden phone:inline-block">
        <p class="search-heading__phone">{{ searchHeading }}</p>
      </div>
    </div>
    <div class="search-main flex relative">
      <div class="px-default tablet:hidden">
        <search-clusters class="search-clusters"></search-clusters>
      </div>
      <div class="px-default phone:px-0 flex-grow">
        <div class="search-cluster-tags flex-wrap phone:mt-5">
          <div class="search-cluster-tags-item" v-for="tag in clusterTags" :key="tag">{{ tag }}</div>
        </div>
        <div class="search-filters select-none">
          <!-- <div class="hidden tablet:block">
            <button>Фильтры</button>
          </div>-->
          <form class="flex">
            <div class="search-filters-item">
              <select name="order_by" v-model="orderBy" @change="changeOrder">
                <option
                  v-for="option in sorting.orderBy"
                  :key="option.value"
                  :value="option.value"
                >{{ option.label }}</option>
              </select>
            </div>
            <div class="search-filters-item">
              <select name="period" v-model="period" @change="changePeriod">
                <option
                  v-for="option in sorting.period"
                  :key="option.value"
                  :value="option.value"
                >{{ option.label }}</option>
              </select>
            </div>
            <div class="search-filters-additional ml-auto flex">
              <div class="list-text flex tablet:hidden">
                <div class="filter-button active flex items-center">Списком</div>
                <div class="filter-button flex items-center">На карте</div>
              </div>
              <div class="filter-button tablet:hidden flex items-center">Изменить запрос</div>
              <div class="list-text-icons flex hidden tablet:flex">
                <div class="filter-button">
                  <span class="icon"></span>
                </div>
                <div class="filter-button active">
                  <span class="icon"></span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div v-if="searchResult.found" class="search-results">
          <vacancy-card v-for="vacancy in searchResult.items" :key="vacancy.id" :vacancy="vacancy"></vacancy-card>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import SearchClusters from "@/components/SearchClusters.vue";
import VacancyCard from "@/components/VacancyCard.vue";

export default {
  components: { SearchClusters, VacancyCard },
  data() {
    return {
      searchResult: {
        found: ""
      },
      clusterTags: [
        "Подработка",
        "Свежие",
        "Сменный график",
        "Удаленная работа",
        "Нет опыта"
      ],
      orderBy: "relevance",
      period: 30,
      sorting: {
        orderBy: [
          {
            label: "по дате",
            value: "publication_time"
          },
          {
            label: "по убыванию зарплаты",
            value: "salary_desc"
          },
          {
            label: "по возрастанию зарплаты",
            value: "salary_asc"
          },
          {
            label: "по соответствию",
            value: "relevance"
          }
        ],
        period: [
          {
            label: "за месяц",
            value: 30
          },
          {
            label: "за неделю",
            value: 7
          },
          {
            label: "за три дня",
            value: 3
          },
          {
            label: "за сутки",
            value: 1
          }
        ]
      }
    };
  },
  created() {
    this.fetchData();
    this.matchFilters(this.$route.query);
  },
  watch: {
    query() {
      this.fetchData();
    }
  },
  computed: {
    query: {
      get() {
        return this.$route.query;
      }
      // set(newValue) {
      //   this.$route.query = newValue;
      // }
    },
    searchHeading() {
      let found = this.searchResult.found;
      let searchText = this.query.text;

      if (!found && searchText) {
        return `По запросу «${searchText}» ничего не найдено`;
      } else if (searchText) {
        return `${found} вакансий «${searchText}»`;
      }
      return `Найдено ${found} вакансий`;
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.fetchData();
  //   this.matchFilters(to.query);

  //   next();
  // },
  methods: {
    fetchData() {
      this.$store.dispatch("searchVacancies", this.query).then(res => {
        this.searchResult = res.data;
      });
    },
    changeOrder() {
      const newQuery = { ...this.query };
      newQuery["order_by"] = this.orderBy;
      this.$router.push({ path: "search?", query: newQuery });
    },
    changePeriod() {
      const newQuery = { ...this.query };
      newQuery.period = this.period;
      this.$router.push({ path: "search?", query: newQuery });
    },
    matchFilters(query) {
      if (query["order_by"]) {
        this.orderBy = query["order_by"];
      }
      if (query["period"]) {
        this.period = query["period"];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-heading {
  margin: 25px 0;

  // h1 {
  //   padding-top: -1px;
  // }

  @media (max-width: 699px) {
    margin: 0;
    border-bottom: 1px solid #eee;
  }

  &__phone {
    color: #999;
    font-size: 14px;
    font-style: italic;
    padding: 15px 0;
  }
}

.search-clusters {
  position: sticky;
  top: 0;
}

.search-main {
  .search-cluster-tags {
    display: flex;
    margin-bottom: 20px;

    @media (max-width: 699px) {
      padding: 0 15px;
    }

    &-item {
      background: #ededed;
      border: 1px solid;
      border-color: #ededed;
      border-radius: 15px;
      cursor: pointer;
      font-size: 14px;
      height: 30px;
      line-height: 28px;
      margin-bottom: 10px;
      margin-right: 10px;
      padding: 0 20px;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;

      &:hover {
        background-color: rgba(203, 209, 211, 0.6);
        border-color: transparent;
      }
    }
  }

  .search-filters {
    margin-bottom: 25px;

    @media (max-width: 699px) {
      padding: 0 15px;
    }

    &-item {
      margin-right: 10px;
    }
    select {
      background-color: #fff;
      border: 1px solid #cbd1d4;
      border-radius: 0;
      cursor: pointer;
      font-size: 14px;
      height: 38px;
      margin: 0;
      padding: 0 26px 0 11px;

      background-image: url(https://i.hh.kz/bloko/common/styles/select__min_.svg);
      background-repeat: no-repeat;
      background-position: right center;

      -webkit-appearance: none;
      -moz-appearance: none;

      &:hover {
        border-color: #acb5ba;
      }

      &:focus {
        border-color: #0f8fee;
        outline: none;
      }
    }

    &-additional {
      .list-text {
        margin-right: 10px;
        .filter-button:nth-child(2) {
          margin-left: -1px;
        }

        &-icons {
          .filter-button {
            width: 38px;
            // height: 38px;
            display: flex;
            align-items: center;

            &:first-child {
              .icon {
                width: 16px;
                height: 16px;
                background-image: url(https://i.hh.kz/bloko/blocks/icon/geolocation-icon__min_.svg?01062020);
                background-position: 0 0;
              }
            }
            &:nth-child(2) {
              margin-left: -1px;

              .icon {
                width: 16px;
                height: 16px;
                background-image: url(https://i.hh.kz/bloko/blocks/icon/list-more-icon__min_.svg?01062020);
                background-position: 0 0;
              }
            }
          }
        }
      }
      .filter-button {
        background-color: #fff;
        border: 1px solid #cbd1d4;
        cursor: pointer;
        font-size: 14px;
        height: 38px;
        margin: 0;
        padding: 0 11px;
        vertical-align: middle;

        // display: flex;
        // align-items: center;

        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
          box-shadow 0.2s ease-in-out;

        &.active {
          background-color: #e5e5e5;
          box-shadow: inset 0 2px rgba(0, 0, 0, 0.2);
        }

        &:focus {
          border-color: #0f8fee;
        }

        &:hover {
          border-color: #acb5ba;
          z-index: 1;
        }

        &:active {
          background-color: #e5e5e5;
          border-color: #0f8fee;
          box-shadow: inset 0 2px rgba(0, 0, 0, 0.2), 0 1px rgba(0, 0, 0, 0.15);
          z-index: 1;
        }
      }
    }
  }
}
</style>
