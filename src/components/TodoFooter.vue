<template>
  <div class="todo-footer">
    <label>
     <!-- <input type="checkbox" v-model="isAllCheck"/>-->
      <slot name="isAllCheck"></slot>
    </label>
        <!--  <span>已完成{{completedSize}}/ 全部{{todos.length}}</span> -->
    <slot name="count"></slot>
   <!-- <button class="btn btn-danger" v-show="completedSize>0" @click="delCompleteTodos">清除已完成任务</button>-->
    <slot name="del"></slot>
  </div>
</template>

<script>
  export default {
    props:{
      todos:Array,
      delCompleteTodos:Function,
      selectAllTodos:Function
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
