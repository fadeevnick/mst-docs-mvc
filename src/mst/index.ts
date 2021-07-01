import { destroy, getRoot, types } from 'mobx-state-tree'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters";

const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ALL].map(types.literal))
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: any) => !todo.completed,
  [SHOW_COMPLETED]: (todo: any) => todo.completed
}

const Todo = types.model({
  text: types.string,
  completed: false,
  id: types.identifierNumber
})
  .actions((self) => ({
    remove() {
      //@ts-ignore
      getRoot(self).removeTodo(self)
    },
    edit(text: string) {
      //@ts-ignore
      if (!text.length) self.remove();
      else self.text = text
    },
    toggle() {
      self.completed = !self.completed
    }
  }))

const TodoStore = types.model({
  todos: types.array(Todo),
  filter: types.optional(filterType, SHOW_ALL)
})
  .views((self) => ({
    get completedCount() {
      return self.todos.filter((todo) => todo.completed).length
    },
    get activeCount() {
      return self.todos.length - self.todos.filter((todo) => todo.completed).length;
    },
    getFilteredTodos() {
      //@ts-ignore
      return self.todos.filter(TODO_FILTERS[self.filter])
    }
  }))
  .actions((self) => ({
    addTodo(text: string) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      self.todos.unshift({ id, text })
    },
    removeTodo(todo: any) {
      destroy(todo)
    },
    completeAll() {
      const areAllMarked = self.todos.every((todo) => todo.completed);
      self.todos.forEach(todo => todo.completed = !areAllMarked);
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter((todo) => !todo.completed));
    },
    setFilter(filter: string) {
      self.filter = filter;
    }
}))

export default TodoStore;