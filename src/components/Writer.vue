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
        Statistics:
        <div class="title d-flex flex-row justify-space-between">
          <p>Errors: {{ errors }}</p>
          <p>
            Time: {{ timer.minutes.innerHTML }}:{{ timer.seconds.innerHTML }}
          </p>
        </div>
      </div>
    </v-card>
    <div id="areas">
      <v-textarea
        class="textarea"
        v-if="same"
        solo
        no-resize
        auto-grow
        :label="lection"
      ></v-textarea>
      <v-textarea
        id="mainArea"
        v-model="text"
        :background-color="areaColor"
        class="textarea green--text"
        auto-grow
        solo
        no-resize
        @keydown.8="skip($event)"
        @input="newKey($event)"
      ></v-textarea>
    </div>

    <div class="d-flex justify-space-around display-1 ">
      <p>Time: <span id="minutes">00</span>:<span id="seconds">00</span></p>
      <p>Errors: {{ errors }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Writer",
  data() {
    return {
      lection: "This is a fucking test!",
      text: "",
      same: true,
      areaColor: "",
      errors: 0,
      inError: false,
      finished: false,
      timer: {
        minutes: "",
        seconds: "",
        totalSeconds: 0,
        interval: null
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById("mainArea").focus();

      this.timer.minutes = document.getElementById("minutes");
      this.timer.seconds = document.getElementById("seconds");
      ++this.timer.totalSeconds;
      this.timer.interval = setInterval(this.setTime, 1000);
    });
  },
  methods: {
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
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    .textarea {
      position: absolute;
      width: 1000px;

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
