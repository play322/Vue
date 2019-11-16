<template>
  <div class="todo-container">
    <div class="todo-wrap">
     <TodoHeader :addTodo="addTodo"/>
      <TodoList :todos="todos" :delTodo="delTodo"/>
      <TodoFooter :todos="todos" :delCompleteTodos="delCompleteTodos" :selectAllTodos="selectAllTodos"/>
    </div>
  </div>
</template>

<script>
  //1，引入组件
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  export default {
    data(){
      return{
        //从localStorage文件读取json数据
      todos:JSON.parse(window.localStorage.getItem('todos_key') || '[]')
        /*[
        {title:'吃饭',complete:false},
        {title:'睡觉',complete:false},
        {title:'学习',complete:false}
      ]*/
      }
    },
    methods:{
      //添加任务
      addTodo (todo) {
        this.todos.unshift(todo)
      },
      //删除任务
      delTodo(index){
        this.todos.splice(index,1)
      },
      //清除已完成任务
      delCompleteTodos(){
        //过滤complete为false的后产生一个新的数组,再进行一次赋值
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      //全选/全不选
      selectAllTodos(isChecked){
        //遍历todos数组，用传进来的是否勾选的值去改变todos的complete状态
        this.todos.forEach(todo => todo.complete = isChecked)
      }
    },

    watch:{ //监视
      todos:{
        deep:true,   //深度监视
        handler:function (value) { //最新发生变化的todos值
          //将最新的todos值的json数据，保存到localStorage
            window.localStorage.setItem('todos_key',JSON.stringify(value))
        }
      }


    },
    //2，映射为组件标签
    components:{
      TodoHeader,
      TodoList,
      TodoFooter
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
