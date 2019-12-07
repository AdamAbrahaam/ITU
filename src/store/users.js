import firebase from "firebase";

export default {
  namespaced: true,
  state: {
    userData: JSON.parse(localStorage.getItem("userData") || "{}"),
    currentUser: JSON.parse(localStorage.getItem("currentUser") || "{}")
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      state.userData = {};
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userData");
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
      localStorage.setItem("userData", JSON.stringify(state.userData));
    }
  },
  actions: {
    async register({ commit, dispatch }, regInfo) {
      let response;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(regInfo.email, regInfo.password)
        .then(
          user => {
            commit("SET_CURRENT_USER", user.user);

            let data = {
              name: regInfo.name,
              time: 0,
              lectureCount: 0,
              errorCount: 0
            };
            firebase
              .firestore()
              .collection("users")
              .doc(user.user.uid)
              .set(data);

            dispatch("getUserData", user.user.uid);
            response = user;
          },
          error => {
            commit("SET_CURRENT_USER", null);
            response = error;
          }
        );
      return response;
    },
    async login({ commit, dispatch }, logInfo) {
      let response;
      await firebase
        .auth()
        .signInWithEmailAndPassword(logInfo.email, logInfo.password)
        .then(
          user => {
            commit("SET_CURRENT_USER", user.user);
            dispatch("getUserData", user.user.uid);
            response = user;
          },
          error => {
            commit("SET_CURRENT_USER", null);
            response = error;
          }
        );

      return response;
    },
    async logout({ commit }) {
      firebase.auth().signOut();
      commit("LOGOUT_USER");
    },
    async getUserData({ commit }, uid) {
      let userRef = firebase
        .firestore()
        .collection("users")
        .doc(uid);

      let collectionRef = firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("lectures");

      let userData;
      await userRef.get().then(doc => {
        userData = doc.data();
      });
      userData.lectures = [];
      await collectionRef.get().then(doc => {
        doc.forEach(doc => {
          userData.lectures.push(doc.data());
        });
      });
      commit("SET_USER_DATA", userData);
    },
    async updateStats({ dispatch }, { stats, lecture, uid }) {
      let user = firebase
        .firestore()
        .collection("users")
        .doc(uid);

      let oldData;
      await user.get().then(doc => {
        oldData = doc.data();
      });

      user.update({
        errorCount: oldData.errorCount + stats.errors,
        lectureCount: oldData.lectureCount + 1,
        time: oldData.time + stats.time
      });

      if (lecture) {
        let lec = firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("lectures")
          .doc(lecture.name);

        let oldLecture;
        await lec.get().then(doc => {
          oldLecture = doc.data();
        });

        lec.update({
          done: oldLecture.done + 1,
          time: lecture.time
        });
      }

      dispatch("getUserData", uid);
    }
  }
};
