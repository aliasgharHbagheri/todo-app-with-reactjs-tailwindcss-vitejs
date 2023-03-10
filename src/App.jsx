import { useEffect, useState } from 'react';

// Import Components
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';


const App = () => {

  const [displayMode, setDisplayMode] = useState('light');

  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    setDisplayMode(JSON.parse(localStorage.getItem('displayMode')));
    getLocalTodos();
  }, [])


  // Run Function Create And Save in LocalStorage
  useEffect(() => {
    saveToLocalTodos();
    saveThemeToLocal();
  }, [displayMode, todos])


  //  Create And Save Display Mode In LocalStorage
  const saveThemeToLocal = () => {
    if (localStorage.getItem('displayMode') == null) {
      localStorage.setItem('displayMode', JSON.stringify(displayMode));
    } else {
      localStorage.setItem('displayMode', JSON.stringify(displayMode));
    }
  }


  //  Create And Save Display Mode In LocalStorage
  const saveToLocalTodos = () => {
    if (localStorage.getItem('todos') == null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') == null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }


  // Add Todo
  const addTodoHandler = () => {
    if (newTodo) {
      const newEntry = {
        id: Math.random() * 20,
        name: newTodo,
        status: false
      };

      setTodos([...todos, newEntry]);
      setNewTodo('');
    }
  }

  const deleteTodoHandler = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const checkTodoHandler = (id) => {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          name: todo.name,
          status: !todo.status
        }
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  }

  return (
    <div className={`${displayMode === 'dark' ? 'dark' : 'light'}
    w-full  
  `}>
      <div className='w-full min-h-screen h-auto flex justify-center transition-all duration-300 
     py-20 overflow-visible dark:bg-zinc-900'>
        <div className='w-full h-auto px-3 md:w-3/6 rounded-md dark:bg-zinc-900 py-20'>
          <Header displayMode={displayMode} setDisplayMode={setDisplayMode} />
          <Form addTodoHandler={addTodoHandler} newTodo={newTodo} setNewTodo={setNewTodo} />
          <TodoList todos={todos} deleteTodoHandler={deleteTodoHandler} checkTodoHandler={checkTodoHandler} />
        </div>
      </div>
    </div>
  );
}

export default App