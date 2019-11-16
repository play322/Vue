<template>
  <div class="todo-container">
    <div class="todo-wrap">
    <!-- <TodoHeader @addTodo="addTodo"/> -->  <!--给TodoHeader标签对象绑定addTodo事件监听-->
      <TodoHeader ref="header"/>
      <TodoList :todos="todos" />
      <TodoFooter :todos="todos" :delCompleteTodos="delCompleteTodos" :selectAllTodos="selectAllTodos"/>
      <TodoFooter>
        <input type="checkbox" v-model="isAllCheck" slot="isAllCheck"/>
        <span slot="count">已完成{{completedSize}}/ 全部{{todos.length}}</span>
        <button  slot="del" class="btn btn-danger" v-show="completedSize>0" @click="delCompleteTodos">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>
 <!--
   绑定事件监听 ---- 订阅消息
    触发事件 ----- 发布消息
    好处：组件之间没有位置的限制，父子/父孙/兄弟...
-->
<script>
  //1，引入组件
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  import storageUtil from './util/storageUtil'
  export default {
    data(){
      return{
        //从localStorage文件读取json数据
      //todos:JSON.parse(window.localStorage.getItem('todos_key') || '[]')
        todos:storageUtil.readTodos()
        /*[
        {title:'吃饭',complete:false},
        {title:'睡觉',complete:false},
        {title:'学习',complete:false}
      ]*/
      }
    },
    computed:{
      completedSize(){  //计算已完成任务的数量
        //reduce一个数组的方法
        //解释reduce参数：
        // preTotal初始值为0，若complete为true，preTotal+1，若complete为false，preTotal+0，以此计算已完成任务的数量
        return this.todos.reduce((preTotal,todo) => preTotal + (todo.complete?1:0),0)
      },
      isAllCheck:{
        get () {
          return this.completedSize==this.todos.length && this.completedSize>0
        },
        set (value) {  //value是checkbox最新的值
          //传到全选或全不选的方法中去改变todos的complete状态
          this.selectAllTodos(value)
        }
      }
    },
    mounted () {  //执行异步任务
      //给<HeaderTodo/>绑定addTodo事件监听
      this.$refs.header.$on('addTodo',this.addTodo)

      //订阅消息
      PubSub.subscribe('delTodo',(msg,index) => {
        this.delTodo(index)
      })
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
        /*handler:function (value) { //最新发生变化的todos值
          //将最新的todos值的json数据，保存到localStorage
           // window.localStorage.setItem('todos_key',JSON.stringify(value))
          storageUtil.saveTodos(value)
        }*/
        handler:storageUtil.saveTodos
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
