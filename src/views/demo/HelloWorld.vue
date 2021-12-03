<template>
  <el-form ref="remoteApiTestForm" :model="remoteApiTestForm" v-loading="loading"
    :rules="rules" @submit.native.prevent label-width="140px">
    <el-form-item label="输入你想对我说的话:" prop="searchText">
      <el-input v-model="remoteApiTestForm.searchText" @keyup.enter.native="doSearch" clearable>
        <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="结果:">
      <span>{{msg}}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      loading:false,
      remoteApiTestForm:{
        searchText:""
      },
      msg: '',
      rules:{
        searchText:[
          { type:"required", trigger:"blur" },
          { type:"maxSize", value:50 }
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    doSearch() {
      let self = this;
      self.$refs.remoteApiTestForm.validate(async (valid) => {
        if (valid) {
          if (self.loading === true) {
            return;
          }
          try {
            self.loading = true;
            let res = await this.$axios({
              method: 'get',
              url: '/api/askme',
              params:{
                'msg': self.remoteApiTestForm.searchText
              },
              data:{}
            })
            if (res.flag) {
              self.msg = res.data;
            } else {
              self.msg = "api error"
            }
            self.loading = false;
          } catch (error) {
            self.loading = false;
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
