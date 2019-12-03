import firebase from "firebase";

export default {
  namespaced: true,
  state: {
    currentUser: "" //JSON.parse(localStorage.getItem("currentUser") || "{}")
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      localStorage.removeItem("currentUser");
    }
  },
  actions: {
    async register({ commit }, regInfo) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(regInfo.email, regInfo.password)
        .then(
          user => {
            commit("SET_CURRENT_USER", user.user);
          },
          err => {
            if (err) {
              commit("SET_CURRENT_USER", null);
            }
          }
        );
    },
    async login({ commit }, logInfo) {
      let response;
      await firebase
        .auth()
        .signInWithEmailAndPassword(logInfo.email, logInfo.password)
        .then(
          user => {
            commit("SET_CURRENT_USER", user.user);
            response = user;
          },
          error => {
            commit("SET_CURRENT_USER", null);
            response = error;
          }
        );

      return response;
    },
    logout({ commit }) {
      commit("LOGOUT_USER");
    }
  }
};
