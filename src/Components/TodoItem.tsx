import React, { useState } from "react";
import TodoTextInput from "./TodosTextInput";
import { observer } from 'mobx-react'
import { domainToASCII } from "url";
import { TodoType } from "../mst";

type TodoItemPropsType = {
  todo: TodoType
}

function TodoItem(props: TodoItemPropsType) {
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
  }

  const handleSave = (id: number, text: string) => {
    props.todo.edit(text)
  }
  
  return (
    <li>
      {editing ? (
        <TodoTextInput text={props.todo.text} onSave={(text: string) => handleSave(props.todo.id, text)} />
      ) : (
          <div>
            <input type="checkbox" checked={props.todo.completed} onChange={() => props.todo.toggle()} />
            <label onDoubleClick={handleDoubleClick}>{props.todo.text}</label>
            <button onClick={() => props.todo.remove()}>delete</button>
          </div>
      )}
    </li>
  )
}

export default TodoItem;