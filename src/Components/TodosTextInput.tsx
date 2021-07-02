import { observer } from 'mobx-react';
import React from 'react';

type TodoTextInputPropsType = {
  text: string,
  onSave: (text: string) => void
}

const TodoTextInput = observer((props: TodoTextInputPropsType) => {
  const [editingText, setEditingText] = React.useState(props.text);

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
      <button onClick={handleSubmit}>create</button>
  </div>
})

export default TodoTextInput;