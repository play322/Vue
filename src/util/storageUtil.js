/*存储数据的工具模块，向外暴露的方式
* 1，函数
* 2，对象
* 如何选择？看业务有几个功能，一个功能暴露函数，多个功能暴露对象
* */

const TODOS_KEY = 'todos_key'
export default {
  saveTodos (todos) {
    window.localStorage.setItem(TODOS_KEY,JSON.stringify(todos))
  },
  readTodos () {
    return JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
  }
}
