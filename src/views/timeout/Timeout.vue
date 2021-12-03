<template src="./timeout.html"></template>
<style scoped src="./timeout.css"></style>
<script>
export default {
  data() {
    return {
      time: 5,
      timeoutFlg: null
    };
  },
  mounted() {
    this.time = 5;
    this.timeoutFlg = setInterval(() => {
      if (this.time < 1) {
        this.$router.push({
          path: "/login"
        });
      } else {
        this.time = this.time - 1;
      }
    }, 1000);
  },
  beforeDestroy() {
    this.timeoutFlg && clearInterval(this.timeoutFlg)
  },
  methods: {
    quickEnter() {
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
