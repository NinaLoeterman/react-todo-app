import React from 'react';
import './App.css';
import TodoList from './components/todo/todo.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList></TodoList>
      </header>
    </div>
  );
}

export default App;
