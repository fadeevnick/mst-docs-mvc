import { destroy, getRoot, types, Instance } from 'mobx-state-tree'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/TodoFilters";
import { FiltersType } from '../constants/TodoFilters';

// const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ALL].map(types.literal))
const filterType = types.custom<string, FiltersType>({
  name: "FilterType",
  fromSnapshot(value: string) {
    return value as FiltersType;
  },
  toSnapshot(value: FiltersType) {
    return value.toString();
  },
  isTargetType(value: string) {
    return value as FiltersType !== undefined;
  },
  getValidationMessage(value: string) {
    if (this.isTargetType(value)) return ''
    return "It's not the FiltersType";
  }
});

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: TodoType) => !todo.completed,
  [SHOW_COMPLETED]: (todo: TodoType) => todo.completed
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
    get filteredTodos() {
      return self.todos.filter(TODO_FILTERS[self.filter])
    }
  }))
  .actions((self) => ({
    addTodo(text: string) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
      self.todos.unshift({ id, text })
    },
    removeTodo(todo: TodoType) {
      destroy(todo)
    },
    completeAll() {
      const areAllMarked = self.todos.every((todo) => todo.completed);
      self.todos.forEach(todo => todo.completed = !areAllMarked);
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter((todo) => !todo.completed));
    },
    setFilter(filter: FiltersType) {
      self.filter = filter;
    }
}))

export default TodoStore;
export interface TodoType extends Instance<typeof Todo> { };
export interface TodoStoreType extends Instance<typeof TodoStore> { };