<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              outlined
              ref="lecture.name"
              v-model="lecture.name"
              label="Lecture name"
              type="text"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              outlined
              ref="lecture.language"
              v-model="lecture.language"
              label="Language"
              type="text"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              outlined
              class="mt-n6"
              ref="lecture.code"
              v-model="lecture.code"
              label="Paste your code here..."
              no-resize
              rows="20"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        width="90%"
        color="blue"
        class="mt-n12 mb-3"
        large
        dark
        @click.prevent="add()"
      >ADD LECTURE</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddLecture",
  data() {
    return {
      lecture: {
        name: "",
        language: "",
        code: "",
        time: "",
        done: 0
      }
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  methods: {
    add() {
      this.$store.dispatch("lectures/addLecture", {
        lecture: this.lecture,
        uid: this.currentUser.uid
      });

      this.$emit("clicked", false);

      this.lecture.name = "";
      this.lecture.language = "";
      this.lecture.code = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
