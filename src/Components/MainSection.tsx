import React, { useState } from 'react'
import TodoItem from './TodoItem';
import { observer } from 'mobx-react';
import { useStore } from '../StateProvider';

function MainSection() {
  const { todosStore: store } = useStore();

    function renderToggleAll() {
        if (store.todos.length > 0) {
            return (
                <span>
                    <input
                        className="toggle-all"
                        id="toggle-all"
                        type="checkbox"
                        checked={store.completedCount === store.todos.length}
                        onChange={() => store.completeAll()}
                    />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                </span>
            )
        }
    }

    // function renderFooter() {
    //     if (store.todos.length) {
    //         return <Footer store={store} />
    //     }
    // }

  const { filteredTodos } = store;

    return (
        <section className="main">
            {renderToggleAll()}
            <ul className="todo-list">
                {filteredTodos.map((todo: any) => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
            {/* {renderFooter()} */}
        </section>
    )
}

export default observer(MainSection)