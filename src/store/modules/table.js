const table = {
    namespaced:true,
    state: {
        isLogin:false,
        userInfo:{},
        username2:'table'
    },
    actions:{
        ceshi(){
            console.log('执行了table测试函数')
        }
    }
}

export default table
