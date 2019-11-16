<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isAllCheck"/>
    </label>
    <span>
          <span>已完成{{completedSize}}</span> / 全部{{todos.length}}
        </span>
    <button class="btn btn-danger" v-show="completedSize>0" @click="delCompleteTodos">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    props:{
      todos:Array,
      delCompleteTodos:Function,
      selectAllTodos:Function
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
    }
  }
</script>

<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
