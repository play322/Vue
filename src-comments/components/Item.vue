<template>
  <li class="list-group-item">
    <div class="handle">
      <a href="javascript:;" @click="removeComment">删除</a>
    </div>
    <p class="user"><span >{{comment.name}}</span><span>说:</span></p>
    <p class="centence">{{comment.content}}!</p>
  </li>
</template>

<script>
  export default {
    props:{   //与props：[] 的这种写法相比，此种方式指定属性名和属性值的类型
      comment:Object,
      deleteComment:Function,
      index:Number
    },
    methods:{
      removeComment(){
        //取到要删除的数据
        const {comment,index} = this
        if(window.confirm(`确定删除${comment.name}的评论吗？`)){
          this.deleteComment(index)
        }
      }
    }
  }
</script>

<style>
  li {
    transition: .5s;
    overflow: hidden;
  }

  .handle {
    width: 40px;
    border: 1px solid #ccc;
    background: #fff;
    position: absolute;
    right: 10px;
    top: 1px;
    text-align: center;
  }

  .handle a {
    display: block;
    text-decoration: none;
  }

  .list-group-item .centence {
    padding: 0px 50px;
  }

  .user {
    font-size: 22px;
  }
</style>
