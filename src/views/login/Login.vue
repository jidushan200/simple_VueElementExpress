<template src="./login.html"></template>
<style scoped src="./login.css"></style>
<script>
import {setToken} from '@/utils/token'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      loginError:"",
      formInline: {
        account: 'admin',
        password: '111111'
      },
      ruleInline: {
        account: [
          { required: true, message: '用户名不能为空白', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空白', trigger: 'blur' }
        ]
      },
      language: this.$cookie.get('language') || 'zh',
      loading: false,
      verifyError:""
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('user', ['login']),
    changeLanguage(language) {
      this.language = language;
      this.$cookie.set('language', language, {expires:'365D'});
      this.$i18n.locale = language;
      document.location.reload();
    },
    handleSubmit() {
      const self = this;
      this.$refs.form.validate((valid) => {
        if (!valid) { return; }
        self.loginError = "";
        self.verifyError = "";
        self.loading = true;
        self.login({
          "account": self.formInline.account,
          "password": self.formInline.password
        }).then((response) => {
          self.loading = false;
          let result = response.data;
          setToken(result.token)
          this.$router.push({
            path:'/'
          })
        }).catch((e) => {
          self.loading = false;
        });
      });
    }
  }
}
</script>
