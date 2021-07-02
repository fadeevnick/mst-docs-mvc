import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainSection from './Components/MainSection';
import Header from './Components/Header';
import { useStore } from './StateProvider';

function App() {
  const { todosStore } = useStore();

  return (
    <div className="App">
      <Header addTodo={todosStore.addTodo} />
      <MainSection />
    </div>
  );
}

export default App;
