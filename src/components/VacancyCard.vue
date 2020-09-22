<template>
  <div class="vacancy">
    <div class="vacancy-row vacancy-header flex phone:flex-col">
      <div>
        <router-link
          :to="{ path: `/vacancy/${vacancy.id}` }"
          class="button-link"
        >
          {{ vacancy.name }}
        </router-link>
      </div>
      <div class="text-right">{{ getSalary }}</div>
    </div>
    <div class="vacancy-company-info flex items-center">
      <router-link to="">{{ vacancy.employer.name }}</router-link>
      <span v-if="vacancy.employer.trusted" class="icon-company-trusted"></span>
    </div>
    <div class="vacancy-company-info vacancy-row">{{ vacancy.area.name }}</div>
    <div
      class="vacancy-row flex justify-between"
      v-if="vacancy.snippet.responsibility || vacancy.snippet.requirement"
    >
      <div class="vacancy-snippets flex-col">
        <p v-html="vacancy.snippet.responsibility"></p>
        <p v-html="vacancy.snippet.requirement"></p>
      </div>
      <div class="vacancy-company-logo" v-if="vacancy.employer.logo_urls">
        <img
          :src="vacancy.employer.logo_urls['90']"
          :alt="vacancy.employer.name"
        />
      </div>
    </div>
    <div class="vacancy-controls vacancy-row flex">
      <router-link to="">Откликнуться</router-link>
      <!-- <router-link to="">Показать контакты</router-link> -->
      <span class="vacancy-published-date">{{ publishedAt }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {};
  },
  props: {
    vacancy: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getSalary() {
      let salary = this.vacancy.salary;

      if (!salary) return "";

      if (salary.from && salary.to) {
        return (
          this.formatSalary(salary.from) +
          "-" +
          this.formatSalary(salary.to) +
          " " +
          salary.currency
        );
      } else if (salary.from && !salary.to) {
        return `от
                ${this.formatSalary(salary.from)}
                ${salary.currency}`;
      } else if (!salary.from && salary.to) {
        return `до
                ${this.formatSalary(salary.to)}
                ${salary.currency}`;
      }

      return "";
    },

    publishedAt() {
      return moment(this.vacancy.published_at)
        .locale("ru")
        .format("DD MMMM");
    }
  },
  methods: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.vacancy {
  border: 1px solid #e7e7e7;
  display: flex;
  flex-direction: column;
  margin-top: -1px;
  padding: 20px;

  &-row {
    margin-bottom: 6px;
  }

  &-header {
    font-size: 18px;
    align-content: center;
    justify-content: space-between;
    a {
      color: #09f;
      &:visited {
        color: #7f3cba;
      }
      &:hover {
        color: #c00;
      }
    }
  }

  &-company-info {
    line-height: 1.571;
    font-size: 12px;
    color: #999;
    a {
      &:hover {
        color: #c00;
      }
    }
    .icon-company-trusted {
      width: 16px;
      height: 16px;
      display: block;
      margin-left: 4px;
      background-image: url(https://i.hh.kz/bloko/blocks/icon/done-icon__min_.svg?01062020);
      background-position: -18px 0;
    }
  }

  &-snippets {
    font-size: 14px;
  }

  &-company-logo {
    // width: 100px;
    flex: 0 0 auto;
    margin-left: 15px;
  }

  &-controls {
    font-size: 14px;
    line-height: 1.571;

    a {
      margin-right: 20px;
      color: #609fcf;
      &:hover {
        color: #c00;
      }
    }

    .vacancy-published-date {
      color: #b2b2b2;
      margin-left: auto;
    }
  }
}
</style>
<style lang="scss">
.vacancy-snippets {
  highlighttext {
    font-weight: bold;
  }
}
</style>
