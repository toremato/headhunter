<template>
  <div class="app-w">
    <div class="content-py w-full flex">
      <!-- <router-link :to="{ name: 'Vacancy', params: { id: 37126288 } }">Another vacancy</router-link> -->
      <div class="vacancy-container">
        <div class="vacancy-wrapper">
          <div class="vacancy-title">
            <h1>{{ vacancy.name }}</h1>
            <h2 class="vacancy-salary">{{ getSalary(vacancy.salary) }}</h2>
          </div>
          <div class="vacancy-company flex justify-between">
            <div class="vacancy-company-info flex flex-col justify-center">
              <div class="vacancy-company-info-name">
                <router-link to>
                  {{ vacancy.employer ? vacancy.employer.name : "" }}
                </router-link>
                <span
                  v-if="vacancy.employer.trusted"
                  class="icon-company-trusted"
                ></span>
              </div>
              <span v-if="vacancy.address" class="text-sm">
                <span v-if="vacancy.address.metro">
                  <span class="subway-pin"></span>
                  {{ vacancy.address.metro.station_name + ", " }}
                </span>
                {{ vacancy.address.raw }}
              </span>
              <span v-else class="text-sm">{{ vacancy.area.name }}</span>
            </div>
            <div class="vacancy-company-logo" v-if="vacancy.employer.logo_urls">
              <router-link to class="flex items-center h-full">
                <img
                  :src="vacancy.employer.logo_urls['240']"
                  alt
                  class="image"
                />
              </router-link>
            </div>
          </div>
          <div class="vacancy-actions flex">
            <button class="vacancy-actions-apply phone:w-full">
              Откликнуться
            </button>
            <button class="vacancy-actions-favorite flex justify-center">
              <span class="vacancy-actions-favorite-icon"></span>
            </button>
          </div>
          <div class="vacancy-employment-info text-sm">
            <p>Требуемый опыт работы: {{ experience }}</p>
            <p>{{ vacancy.employment.name + ", " + vacancy.schedule.name }}</p>
          </div>
          <div
            v-if="vacancy.branded_description"
            class="branded-vacancy-description mb-10"
            v-html="vacancy.branded_description"
          ></div>
          <div
            v-else
            class="vacancy-description mb-10"
            v-html="vacancy.description"
          ></div>
          <div class="vacancy-skills mb-10">
            <h2 class="font-bold">Ключевые навыки</h2>
            <div class="pt-1 flex flex-wrap">
              <div
                v-for="skill in vacancy.key_skills"
                :key="skill.name"
                class="vacancy-skill mr-2 mb-2"
              >
                <span>{{ skill.name }}</span>
              </div>
            </div>
          </div>
          <div class="vacancy-actions flex">
            <button class="vacancy-actions-apply phone:w-full">
              Откликнуться
            </button>
          </div>
          <div
            ref="similarVacancies"
            class="vacancy-similar similar-vacancies pt-5 px-default phone:px-0"
          >
            <h2 class="header-2">Похожие вакансии</h2>
            <vacancy-card
              v-for="vacancy in similarVacancies.items"
              :key="vacancy.id"
              :vacancy="vacancy"
            ></vacancy-card>
          </div>
        </div>
      </div>
      <div class="vacancy-additional px-default tablet:hidden">
        <div class="flex w-full h-64 bg-gray-300"></div>
        <div v-if="showSuggestedSidebar" class="similar-vacancies-preview">
          <div class="header">Похожие вакансии</div>
          <div
            class="recommended-vacancy"
            v-for="suggestion in suggestedVacancies"
            :key="suggestion.id"
          >
            <router-link
              :to="`/vacancy/${suggestion.id}`"
              class="recommended-vacancy-info"
            >
              <span class="block">
                {{ suggestion.name }}
              </span>
              <span class="block">{{ getSalary(suggestion.salary) }}</span>
            </router-link>
            <router-link to="" class="recommended-vacancy-company">
              {{ suggestion.employer.name + ", " + suggestion.area.name }}
            </router-link>
          </div>
          <span
            class="similar-vacancies-button border-dashed border-b border-current"
            @click="scrollToSimilarVacancies"
            >{{ similarVacancies.found }} похожих вакансий</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import VacancyCard from "@/components/VacancyCard.vue";
export default {
  components: { VacancyCard },
  data() {
    return {
      vacancy: {
        address: {},
        area: {},
        branded_description: true,
        description: "",
        employer: {
          logo_urls: {}
        },
        employment: {},
        experience: {},
        key_skills: [],
        name: "",
        salary: {},
        schedule: {}
      },
      showSuggestedSidebar: true
    };
  },
  created() {
    // this.$store.dispatch("getVacancy", this.$route.params.id).then(res => {
    //   this.vacancy = res.data;
    // });

    this.fetchData(this.$route.params.id);

    this.$nextTick(() => {
      window.addEventListener("scroll", () => {
        if (this.isInViewport(this.$refs.similarVacancies)) {
          this.showSuggestedSidebar = false;
        } else {
          this.showSuggestedSidebar = true;
        }
      });
    });

    window.scrollTo(0, 0);
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("beforeRouteEnter: ", to);
  //   axios.get(`https://api.hh.ru/vacancies/${to.params.id}`).then(res => {
  //     next(vm => {
  //       console.log("Entering route: ", to, vm, res);
  //       vm.$data.vacancy = res.data;
  //     });
  //   });
  // },
  beforeRouteUpdate(to, from, next) {
    // console.log("Routes: ", to, from, next);
    this.$store.dispatch("getVacancy", to.params.id).then(res => {
      this.vacancy = res.data;
    });
    next();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  computed: {
    similarVacancies() {
      return this.$store.getters.getRelatedVacancies;
    },
    experience() {
      if (this.vacancy.experience.id === "noExperience") {
        return "не требуется";
      }
      return this.vacancy.experience.name;
    },
    suggestedVacancies() {
      if (this.similarVacancies.items) {
        return [this.similarVacancies.items[0], this.similarVacancies.items[1]];
      }
      return "";
    }
  },
  methods: {
    fetchData(vacancyId) {
      this.$store.dispatch("getVacancy", vacancyId).then(res => {
        this.vacancy = res.data;
      });
    },
    getSalary(salary) {
      let result = "з/п не указана";

      if (salary) {
        result = "";

        if (salary.from) {
          result += `от ${this.formatSalary(salary.from)} `;
        }

        if (salary.to) {
          result += `до ${this.formatSalary(salary.to)} `;
        }

        result += salary.currency;

        if (!salary.gross) {
          result += " на руки";
        }
      }
      return result;
    },
    formatSalary(salary) {
      let array = String(salary)
        .split("")
        .reverse();
      if (array.length > 3) {
        array.splice(3, 0, " ");
      }
      if (array.length > 7) {
        array.splice(7, 0, " ");
      }

      return array.reverse().join("");
    },
    isInViewport(element) {
      let box = element.getBoundingClientRect();

      return (
        box.bottom >= 0 &&
        box.top <= (window.innerHeight || document.documentElement.clientHeight)
      );
    },
    scrollToSimilarVacancies() {
      this.$refs.similarVacancies.scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss">
.vacancy-wrapper {
  width: 880px;
  > div[class^="vacancy-"] {
    width: 800px;
    padding: 0 15px;
  }

  @media (max-width: 1339px) {
    width: 640px;
    > div[class^="vacancy-"] {
      width: 640px;
    }
  }
  @media (max-width: 1023px) {
    width: 100%;
  }
  @media (max-width: 699px) {
    width: 100%;
    > div[class^="vacancy-"] {
      width: 100%;
    }
  }
}

.vacancy-title {
  margin-top: -1px;
}

.vacancy-company {
  margin-bottom: 25px;

  .vacancy-company-info {
    min-height: 100px;
    margin-right: 30px;

    .vacancy-company-info-name {
      font-size: 22px;
      line-height: 22px;
      margin-bottom: 5px;
      padding-bottom: 2px;
      display: flex;
      align-items: center;

      a {
        color: #09f;
        &:hover {
          color: #c00;
        }
      }

      .icon-company-trusted {
        width: 16px;
        height: 16px;
        display: block;
        margin-left: 4px;
        margin-top: 5px;
        background-image: url(https://i.hh.kz/bloko/blocks/icon/done-icon__min_.svg?01062020);
        background-position: -18px 0;
      }
    }

    .subway-pin {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
      background-color: #cd0505;
    }
  }

  .vacancy-company-logo {
    height: 100px;
    .image {
      max-width: 150px;
      max-height: 100px;
    }
    @media (max-width: 699px) {
      .image {
        max-width: 100px;
      }
    }
  }
}
.vacancy-salary {
  margin-bottom: 25px;
}
.vacancy-actions {
  margin-bottom: 25px;

  .vacancy-actions-apply {
    color: #fff;
    background-color: #8cb900;
    border: 1px solid;
    font-size: 14px;
    border-color: #8cb900;
    height: 38px;
    line-height: 36px;
    padding: 0 15px;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;

    &:hover {
      background-color: #7ea700;
      border-color: #7ea700;
    }
  }

  .vacancy-actions-favorite {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    margin-left: 10px;
    border: 1px solid;
    border-color: #cbd1d4;
    transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;

    &:hover {
      border-color: #acb5ba;
    }

    .vacancy-actions-favorite-icon {
      display: block;
      width: 16px;
      height: 16px;
      background-image: url(https://i.hh.kz/bloko/blocks/icon/favorite-icon__min_.svg?1062021);
      background-position: -144px 0;
    }
  }
}
.vacancy-employment-info {
  margin-bottom: 25px;
}
.vacancy-description {
  font-size: 14px;
  p {
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    margin-left: 20px;
    margin-bottom: 15px;
    li {
      position: relative;
      margin-bottom: 5px;
    }
    li:before {
      display: block;
      position: absolute;
      right: 100%;
      padding-right: 6px;
      content: "—";
    }
  }
}
.branded-vacancy-description {
  padding: 0 15px;
  > div {
    margin: 0;
  }
}
.vacancy-skills {
  .vacancy-skill {
    background-color: rgba(203, 209, 211, 0.3);
    color: #666;
    padding: 0 11px;
    font-size: 14px;
    line-height: 28px;
  }
}

.vacancy-additional {
  width: 320px;

  .similar-vacancies-preview {
    position: fixed;
    bottom: 0;
    width: 290px;
    padding-bottom: 25px;

    .header {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 10px;
    }

    .recommended-vacancy {
      margin-bottom: 13px;

      &-info {
        font-size: 14px;

        &:hover {
          color: #c00;
        }
      }

      &-company {
        font-size: 12px;
        color: #999;

        &:hover {
          color: #c00;
        }
      }
    }

    .similar-vacancies-button {
      font-size: 14px;
      color: #09f;
      cursor: pointer;

      &:hover {
        color: #c00;
      }
    }
  }
}
</style>
