<template>
  <div>
    <div>
      <h1>{{$t(msg)}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedRoutes',
  data () {
    return {
      msg: ''
    }
  },
  mounted() {
    this.msg = this.$route.meta.title;
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
