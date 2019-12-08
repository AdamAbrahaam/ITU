<template>
  <div>
    <v-sheet
      id="header"
      dark
      class="d-flex justify-space-around align-center elevation-12 animated slideInDown"
    >
      <v-row class="mx-3">
        <v-col
          cols="8"
          class="display-1"
          style="font-family: 'Dosis', sans-serif !important;"
        >Welcome back, {{ userData.name }}</v-col>
        <v-col cols="4" class="text-right">
          <v-btn large outlined class="subtitle-1 white--text" @click="logout">logout</v-btn>
        </v-col>
      </v-row>
    </v-sheet>

    <div id="hero"></div>

    <div id="home">
      <v-sheet class="elevation-5">
        <div
          class="display-2 py-3 pl-12"
          style="font-family: 'Dosis', sans-serif !important;"
        >Your statistics</div>
        <v-divider></v-divider>
        <Stats />
      </v-sheet>

      <v-row class="d-flex justify-space-around flex-wrap">
        <v-col cols="9" xl="9" md="9" sm="12" class="d-flex">
          <v-sheet width="100%" class="elevation-5 mt-3 ml-6">
            <div
              class="display-1 py-3 text-center"
              style="font-family: 'Dosis', sans-serif !important;"
            >Your lectures</div>
            <v-divider></v-divider>
            <v-data-table
              id="table"
              disable-sort
              :headers="headers"
              :items="userData.lectures"
              hide-default-footer
            >
              <template v-slot:item.code="{ item }">
                <v-btn
                  color="blue"
                  dark
                  @click="
                    $router.push({
                      name: 'writer',
                      params: { lecture: item }
                    })
                  "
                >Start</v-btn>
              </template>
              <template v-slot:item.time="{ item }">{{item.time == "" ? '-' : item.time}}</template>
            </v-data-table>
          </v-sheet>
        </v-col>
        <v-col cols="3" class="d-flex flex-column">
          <div>
            <v-row class="mx-3 mt-8">
              <v-btn width="96.5%" height="100px" color="blue" dark @click="addLecture = true">
                <div class="d-flex flex-column">
                  <v-icon x-large class="mb-2">mdi-plus-box-outline</v-icon>Add
                  your own lecture
                </div>
              </v-btn>
            </v-row>
            <v-row class="mx-3 mt-6 mb-6">
              <v-btn width="96.5%" height="100px" color="white" @click="chooseLecture = true">
                <div class="d-flex flex-column blue--text">
                  <v-icon x-large class="mb-2">mdi-folder-multiple-outline</v-icon>Choose from existing
                </div>
              </v-btn>
            </v-row>
            <v-row class="mx-3 mt-6 mb-6">
              <v-btn width="96.5%" height="100px" color="white" @click="guide = true">
                <div class="d-flex flex-column blue--text">
                  <v-icon x-large class="mb-2">mdi-keyboard-outline</v-icon>Keyboard guide
                </div>
              </v-btn>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="addLecture" overlay-opacity="0.8" max-width="600px">
      <AddLecture @clicked="closeModal" />
    </v-dialog>

    <v-dialog v-model="chooseLecture" overlay-opacity="0.8" max-width="600px">
      <ChooseLecture @clicked="closeModal" />
    </v-dialog>

    <v-dialog v-model="guide" overlay-opacity="0.8" max-width="800px">
      <v-img src="@/assets/keyboard.png"></v-img>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Stats from "@/components/Stats.vue";
import AddLecture from "@/components/AddLecture.vue";
import ChooseLecture from "@/components/ChooseLecture.vue";
export default {
  name: "Home",
  data() {
    return {
      addLecture: false,
      chooseLecture: false,
      guide: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Language", value: "language" },
        { text: "Times completed", value: "done" },
        { text: "Duration", value: "time" },
        { text: "", value: "code" }
      ]
    };
  },
  components: {
    Stats,
    AddLecture,
    ChooseLecture
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      userData: state => state.users.userData
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout", this.regInfo);
      this.$router.push("/");
    },
    closeModal(to) {
      this.addLecture = to;
      this.chooseLecture = to;
    }
  }
};
</script>

<style lang="scss" scoped>
#hero {
  background: url("../assets/code3.jpg") center;
  background-size: cover;
  height: 45vh;
  margin-top: -40px;
}

#header {
  background: #2196f3;
  width: 1440px;
  height: 80px;
  margin: auto;
  position: relative;
  margin-top: 20px;
  z-index: 1;
}

#home {
  width: 1440px;
  margin: auto;
  min-height: 65vh;
  margin: -35px auto;
}
</style>
