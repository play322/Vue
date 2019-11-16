<template>
  <div class="col-md-4">
    <form class="form-horizontal">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="name">
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea class="form-control" rows="6" placeholder="评论内容" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default pull-right" @click="add">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    //声明接受传过来的方法
    props:{   //此种写法指定了属性名/属性值类型/必要性
      addComment:{
        type:Function,
        required:true
      }
    },
    //数据初始化
    data () {
      return {
        name: '',
        content: ''
      }
    },
    methods: {
      add () {
        //1，收集数据
        const name = this.name.trim()
        const content = this.content.trim()
        //2，数据校验
        if (!name || !content) {
          alert('名字或内容不能为空')
          return
        }
        //3，根据收集的数据，封装成comment对象
        const comment = {
          name,
          content
        }
        //4，添加到comments中
        this.addComment(comment)

        //5，清除输入
        this.name=''
        this.content=''

      }
    }
  }
</script>

<style>

</style>
