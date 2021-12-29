<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    // 登录进来userMsg肯定不为空
    if (sessionStorage.getItem("userMsg")){
      this.$store.state.user = JSON.parse(sessionStorage.getItem("userMsg")).content
    }
  }
}
</script>

<style scoped>
    @import "./assets/font/font.css";
</style>
