import { observer } from 'mobx-react';
import React from 'react';

type TodoTextInputPropsType = {
  onSave: (text: string) => void
}

const TodoTextInput = observer((props: TodoTextInputPropsType) => {
  const [editingText, setEditingText] = React.useState('');

  const handleSubmit = () => {
    props.onSave(editingText);
    setEditingText("");
  }

  const handleChange = (e: any) => {
    setEditingText(e.target.value);
  }

  return <div>
    <input type="text"
      value={editingText}
      onChange={handleChange} />
      <button onClick={handleSubmit}></button>
  </div>
})

export default TodoTextInput;