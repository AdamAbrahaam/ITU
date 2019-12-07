<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="8">
            <p
              style="font-family: 'Dosis', sans-serif !important;"
              class="headline mt-1"
            >Choose a programming language:</p>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="languages"
              v-model="selectedLanguage"
              ref="selectedLanguage"
              :value="languages[0]"
              solo
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center align-center">
          <div class="body-1">Choose a lecture to start coding!</div>
          <v-slide-group v-model="selected" class="pa-4" mandatory show-arrows>
            <v-slide-item v-for="lec in lectures" :key="lec">
              <v-sheet
                color="grey lighten-2"
                class="mx-2 pa-3"
                width="400"
                style="cursor: pointer"
                @click="
                    $router.push({
                      name: 'writer',
                      params: { lecture: lec }
                    })
                  "
              >
                <pre class="caption">{{lec}}</pre>
              </v-sheet>
            </v-slide-item>
          </v-slide-group>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import lecturesJSON from "@/static/lectures.json";
export default {
  name: "ChooseLecture",
  data() {
    return {
      selected: null,
      languages: ["C", "Java", "php"],
      selectedLanguage: "C"
    };
  },
  computed: {
    lectures() {
      return lecturesJSON[this.selectedLanguage];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>