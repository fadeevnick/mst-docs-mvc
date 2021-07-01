import React from 'react';
import {observer} from 'mobx-react'
import TodoTextInput from './TodosTextInput';

type HeaderPropsType = {
  addTodo: (text: string) => void
}

const Header = observer((props: HeaderPropsType) => {
  const handleSave = (text: string) => {
    if (text?.length !== 0) {
      props.addTodo(text)
    }
  }
  return <div>
    <h1>todos</h1>
    <TodoTextInput onSave={handleSave} />
  </div>
})