<template>
  <div class="d-flex justify-space-around py-8">
    <div class="d-flex flex-column align-center">
      <p class="display-4">{{userData.lectureCount}}</p>
      <p class="mt-n5 overline">lectures finished</p>
    </div>

    <div class="d-flex flex-column align-center">
      <p class="display-4">{{userData.time}}</p>
      <p class="mt-n5 overline">seconds spent writing</p>
    </div>

    <div class="d-flex flex-column align-center">
      <p class="display-4">{{userData.errorCount}}</p>
      <p class="mt-n5 overline">overall errors made</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Stats",
  computed: {
    ...mapState({
      userData: state => state.users.userData
    })
  }
};
</script>

<style lang="scss" scoped>
</style>