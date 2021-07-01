import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header addTodo={store.addTodo} />
      <MainSection />
    </div>
  );
}

export default App;
