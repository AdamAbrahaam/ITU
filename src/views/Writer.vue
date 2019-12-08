<template>
  <div id="wrapper">
    <v-card
      id="successPanel"
      v-if="finished"
      height="100%"
      width="100%"
      color="#2ad230"
      class="d-flex flex-column justify-space-around align-center white--text animated fadeInUp"
    >
      <div class="display-3">Good job!</div>
      <div class="display-2">
        Statistics
        <div class="title d-flex flex-row justify-space-between">
          <p class="mr-3">Errors: {{ errors }}</p>
          <v-spacer></v-spacer>
          <p class="ml-3">Time: {{ timer.minutes.innerHTML }}:{{ timer.seconds.innerHTML }}</p>
        </div>
      </div>
      <div class="display-2">
        <v-btn large outlined class="subtitle-1 white--text" @click="$router.push('/home')">continue</v-btn>
      </div>
    </v-card>

    <div id="areas" class="d-flex pt-12">
      <div>
        <div class="textarea">
          <pre v-if="same" style="font-family: 'Consolas', sans-serif !important;">{{ lection }}</pre>
        </div>
        <v-textarea
          :disabled="start"
          style="font-family: 'Consolas', sans-serif !important;"
          id="mainArea"
          v-model="text"
          :background-color="areaColor"
          class="textarea green--text"
          solo
          no-resize
          rows="30"
          @keydown.9="skip($event)"
          @keydown.8="skip($event)"
          @input="newKey($event)"
        ></v-textarea>
      </div>
    </div>

    <div class="d-flex justify-space-around display-1">
      <div class="d-flex flex-column align-center stats">
        <p class="display-3">
          <span id="minutes">00</span>:
          <span id="seconds">00</span>
        </p>
        <p class="mt-n5 overline">TIME</p>
      </div>
      <div class="display-3 success--text stats">{{countdown}}</div>
      <div class="d-flex flex-column align-center stats">
        <p class="display-3">{{errors}}</p>
        <p class="mt-n5 overline">ERRORS</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Writer",
  props: ["lecture"],
  data() {
    return {
      lection: this.lecture.code ? this.lecture.code : this.lecture,
      text: "",
      start: true,
      same: true,
      areaColor: "",
      errors: 0,
      inError: false,
      finished: false,
      countdown: 3,
      timer: {
        minutes: "",
        seconds: "",
        totalSeconds: 0,
        interval: null
      }
    };
  },
  mounted() {
    let cd = setInterval(() => {
      this.cDown(cd);
    }, 1000);
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  methods: {
    cDown(cd) {
      this.countdown--;
      if (this.countdown == 0) {
        clearInterval(cd);
        this.countdown = "Code!";
        this.start = false;

        this.$nextTick(() => {
          document.getElementById("mainArea").focus();
        });

        this.timer.minutes = document.getElementById("minutes");
        this.timer.seconds = document.getElementById("seconds");
        ++this.timer.totalSeconds;
        this.timer.interval = setInterval(this.setTime, 1000);
      }
    },
    setTime() {
      ++this.timer.totalSeconds;
      this.timer.seconds.innerHTML = this.pad(this.timer.totalSeconds % 60);
      this.timer.minutes.innerHTML = this.pad(
        parseInt(this.timer.totalSeconds / 60)
      );
    },
    pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    },
    skip(event) {
      if (!this.inError) {
        event.preventDefault();

        if (event.which == 9) {
          this.text += "  ";
        }
      }
    },
    newKey() {
      let lectionPart = this.lection.substring(0, this.text.length);
      if (this.text === lectionPart) {
        this.correctInput();
      } else {
        this.wrongInput();
      }

      if (this.text.length === this.lection.length && !this.inError) {
        clearInterval(this.timer.interval);
        this.finished = true;
        this.updateStats();
      }
    },
    correctInput() {
      this.same = true;
      this.areaColor = "";

      if (this.inError) {
        let element = document.getElementById("areas");
        element.classList.remove("animated", "shake");
      }
      this.inError = false;
    },
    wrongInput() {
      this.same = false;
      this.areaColor = "red";

      if (!this.inError) {
        this.errors++;
        let element = document.getElementById("areas");
        element.classList.add("animated", "shake");
      }
      this.inError = true;
    },
    updateStats() {
      let isOwn = null;

      let newTime = `${this.timer.minutes.innerHTML}:${this.timer.seconds.innerHTML}`;
      let timeArray = newTime.split(":");
      let seconds = +timeArray[0] * 60 + +timeArray[1];

      let newStats = {
        errors: this.errors,
        time: seconds
      };

      if (this.lecture.code) {
        isOwn = this.lecture;
        isOwn.time = `${this.timer.minutes.innerHTML}:${this.timer.seconds.innerHTML}`;
      }

      this.$store.dispatch("users/updateStats", {
        stats: newStats,
        lecture: isOwn,
        uid: this.currentUser.uid
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#wrapper {
  height: 100%;
  width: 100%;

  #areas {
    position: relative;
    height: 80%;
    width: 1000px;
    margin: auto;

    .textarea {
      position: absolute;
      width: 100%;

      &:nth-child(1) {
        line-height: 18px;
        margin-top: 19px;
        margin-left: 12px;
      }

      &:nth-child(2) {
        opacity: 0.5;
      }
    }
  }

  #successPanel {
    position: absolute;
    z-index: 1;
  }
}
</style>
