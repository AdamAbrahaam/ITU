import firebase from "firebase";

export default {
  namespaced: true,
  actions: {
    async addLecture({ dispatch }, { lecture, uid }) {
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("lectures")
        .doc(lecture.name)
        .set(lecture);

      dispatch("users/getUserData", uid, { root: true });
    }
  }
};
