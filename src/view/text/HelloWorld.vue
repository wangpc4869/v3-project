<template>
    <div class="mt-settlement">
        测试页面
        <p>测试页面</p>
      {{username}}
      <Demo @click.native="getClick"></Demo>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Demo from '@/components/demo'
  export default {
    name: "MtSettlement",
    components:{Demo},
    computed:{
      fullName(){
        return '1111'
      },
      ...mapState(['username'])
    },
    data() {
      return {
        name:'111'
      }
    },
    created() {

      // let params = {
      //   username:'yangkai',
      //   password:'tiza123456'
      // };
      // this.$API('login','',params).then((res)=>{
      //   console.log(res)
      // })
    },
    mounted() {
      this.ceshi()
    },
    watch: { },
    methods: {
      ...mapActions('user',['ceshi']),
      getClick(){
        console.log('我点击了demo组件')
      }

    }
  }
</script>
<style scoped lang="scss">
    .mt-settlement{
        p{
            color: red;
        }
    }
</style>

