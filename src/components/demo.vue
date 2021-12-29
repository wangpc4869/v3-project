<template>
  <div>
    <h1>demo测试页面</h1>
    <button @click.stop="editor">点击按钮</button>
  </div>
</template>

<script>

export default {
  name: "Demo",
  components: {},
  computed: {
  },
  data() {
    return {
      name: '111'
    }
  },
  created() {

  },
  mounted() {
  },
  watch: {},
  methods: {
    editor(){
      console.log(111111)
    }
  }
}
</script>
<style scoped lang="scss">
</style>

