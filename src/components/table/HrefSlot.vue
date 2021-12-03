<script>
export default {
  props: ["text"],
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  render(h) {
    return h("el-button", {
      attrs: {
        type: "text",
        size: "small"
      },
      domProps: {
        innerText: this.text
      },
      on: {
        click: this.hrefClick
      }
    });
  },
  methods: {
    hrefClick() {
      this.$emit("hrefFun");
    }
  }
};
</script>
