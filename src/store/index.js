import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const api = axios.create({
  baseURL: "https://api.hh.ru/"
});

export default new Vuex.Store({
  state: {
    vacanciesList: [],
    currentVacancy: {},
    similarVacancies: []
  },

  mutations: {
    setCurrentVacancy(state, vacancy) {
      state.currentVacancy = vacancy;
    },
    setRelatedVacancies(state, vacancies) {
      state.similarVacancies = vacancies;
    }
  },

  getters: {
    getRelatedVacancies: state => state.similarVacancies
  },

  actions: {
    // getVacanciesList() {
    //   api.get("vacancies").then(res => {
    //     console.log("HURRAY!!: ", res);
    //   });
    // },

    getVacancy({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        console.log("STORE ID", id);
        api
          .get(`vacancies/${id}`)
          .then(res => {
            console.log(`Vacancy with ID ${id} : `, res);
            commit("setCurrentVacancy", res.data);
            dispatch("getRelatedVacancies", res.data.id);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    searchVacancies(store, querySet) {
      let query = "";
      for (let i in querySet) {
        query += i + "=" + querySet[i] + "&";
      }
      console.log("QUERY", query);
      return new Promise((resolve, reject) => {
        api
          .get(`vacancies?clusters=true&${query}`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    getRelatedVacancies({ commit }, vacancyId) {
      return new Promise((resolve, reject) => {
        api
          .get(`/vacancies/${vacancyId}/similar_vacancies`)
          .then(res => {
            commit("setRelatedVacancies", res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {}
});
