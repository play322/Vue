<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对Vue的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
       <!--3,使用标签-->
      <Add :addComment="addComment"/>  <!--把addComment传到Add标签-->
      <List :comments="comments" :deleteComment="deleteComment"/> <!--把初始化值传到List页面-->
    </div>
  </div>
</template>

<script>
  //1,引入组件
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default {
    data(){  //存放初始化值
      return{
        comments:[  //数据在哪个组件更新数据的行为（方法）就应该在哪个组件
          {
            name:'Bob',
            content:'Vue very Good!'
          },
          {
            name:'Tom',
            content:'Vue So Easy!'
          },
          {
            name:'Jack',
            content:'Vue Just So So!'
          }
        ]
      }
    },
    methods:{
      //添加评论
      addComment(coomment){  //由于这个方法有Add标签内调用，故要传到Add标签内
        this.comments.unshift(coomment)
      },
      //删除指定下标的评论
      deleteComment(index){
        this.comments.splice(index,1)
      }
    },
    //2,将组件映射成标签
    components:{
      Add,
      List
    }
  }
</script>

<style>

</style>
