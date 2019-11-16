<template>
  <li @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)" :style="{background: bgColor} ">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>

<script>
  import PubSub from 'pubsub-js'
  export default {
    props:{
      todo:Object,
      index:Number
    },
    data () {
      return {
        bgColor: 'white',  //默认的背景颜色
        isShow: false     //默认按钮是否显示
      }
    },
    methods:{
      handleEnter(isEnter){
        if (isEnter){
          this.bgColor = 'gray'
          this.isShow = true
        }else {
          this.bgColor = 'white'
          this.isShow = false
        }
      },
      del(){
        //获取要删除的相关数据
        const {todo,index} = this
        //调方法删除
        if(window.confirm(`确认删除${todo.title}吗？`)) {
          //delTodo(index)
          //发布消息
          PubSub.publish('delTodo',index)
        }
      }
    }
  }
</script>

<style>

</style>
