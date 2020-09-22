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
    getVacancy({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        api
          .get(`vacancies/${id}`)
          .then(res => {
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
