<template>
  <div class="codemirror">
    <!-- codemirror -->
    <codemirror v-model="code" :options="cmOption"></codemirror>
  </div>
</template>

<script>
// language
import "codemirror/mode/python/python.js";
// theme css
import "codemirror/theme/dracula.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// hint
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
// fullscreen
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen.js";
export default {
  data() {
    const code = `
# Some Example code - python editor demo
import os
from package import ParentClass
@nonsenseDecorator
def doesNothing():
    pass
class ExampleClass(ParentClass):
    @staticmethod
    def example(inputStr):
        a = list(inputStr)
        a.reverse()
        return ''.join(a)
    def __init__(self, mixin = 'Hello'):
        self.mixin = mixin
          `;
    return {
      code,
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-python",
        theme: "dracula",
        extraKeys: {
          "Ctrl": "autocomplete",
          "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
      }
    };
  }
};
</script>
<style>
  .CodeMirror {
    border: 1px solid #eee;
    height: 500px;
  }
  .CodeMirror pre {
    font-size: 14px;
  }
</style>
