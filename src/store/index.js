import { createStore } from 'vuex';
import api from '@/api/api';

export default createStore({
  state: {
    authToken: localStorage.getItem('authToken') || '',
    applications: [],
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token;
      localStorage.setItem('authToken', token);
    },
    SET_APPLICATIONS(state, applications) {
      state.applications = applications;
    },
    LOGOUT(state) {
      state.authToken = '';
      localStorage.removeItem('authToken');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.login(credentials);
        commit('SET_TOKEN', response.data.key);
      } catch (error) {
        throw new Error('Неправильные данные');
      }
    },
    async fetchApplications({ commit, state }) {
      const response = await api.getApplications(state.authToken);
      commit('SET_APPLICATIONS', response.data.results);
    },
    async createApplication({ state }, application) {
      await api.createApplication(state.authToken, application);
    },
    async updateApplication({ state }, { id, application }) {
      await api.updateApplication(state.authToken, id, application);
    },
  },
  getters: {
    isAuthenticated: state => !!state.authToken,
    applications: state => state.applications,
  }
});
