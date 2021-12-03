<script>
/* eslint-disable */
export default {
  props: ["value", "statusList"],
  data() {
    return {
      type: "info",
      text: "-"
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    value(oldVal, newVal) {
      this.init();
    }
  },
  render(h) {
    if (this.type == undefined || this.text == "-") {
      return h("span", {
        domProps: {
          innerText: this.text
        }
      });
    }
    return h("el-tag", {
      attrs: {
        type: this.type
      },
      domProps: {
        innerText: this.text
      }
    });
  },
  methods: {
    getState: function(state, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === state) {
          return arr[i];
        }
      }
      return null;
    },
    init: function() {
      if (this.statusList instanceof Array) {
        if (
          this.value === null ||
          this.value === "" ||
          this.value === undefined
        ) {
          this.text = "-";
        } else {
          let state = this.getState(this.value, this.statusList);
          if (!state) {
            this.text = this.value;
          } else {
            this.text = state.label;
            this.type = state.tag;
          }
        }
      } else if (this.statusList instanceof Object) {
        this.text = this.statusList.label;
        this.type = this.statusList.tag;
      }
    }
  }
};
</script>
