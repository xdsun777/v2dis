<template>
  <div id="app">
    {{ msg }}

    <test />
  </div>
</template>

<script>
import test from './components/test/hello.vue'

export default {
  name: "App",
  components:{
    test
  },
  data() {
    return {
      msg: "hello world",
    };
  },
};
</script>

<style>
#app {
  height: 1000px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
