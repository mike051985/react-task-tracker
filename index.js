//Todo component
function Todo({ todo, toggleTodo }){
    function handleTodoClick() {
      toggleTodo(todo.id)
    }
    
    const completedStyle = {
      fontStyle: "italic",
      color: "#a7a7a7",
      textDecoration: "line-through"
    }
    
    return (
      <div className='checkbox'>
        <label>
          <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />      
         <p style={todo.complete ? completedStyle: null}>
          {todo.name}
          </p> 
        </label> 
        
      </div>
    )
  }
  
  //TodoList component
  function TodoList({ todos, toggleTodo }) {
    return (
      todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
      })
    )
  }
  
  //App component
  const { useState, useRef, useEffect } = React;
  const LOCAL_STORAGE_KEY = 'todoApp.todos'
  
  function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()
    
    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
     if (storedTodos) setTodos(storedTodos)
    }, [])
    
    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])
    
    function toggleTodo(id) {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      setTodos(newTodos)
    }
    
    function handleAddTodo(e) {
      const name = todoNameRef.current.value
      if (name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id: Math.random(10000), name: name, complete: false}]
      })
      todoNameRef.current.value = null
    }
    
    function handleClearTodos() {
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
    }
    
    return (
      <div className='container'>
        <div className='title'>Task Tracker</div>
         <TodoList todos={todos} toggleTodo={toggleTodo} />
         <input className='input' ref={todoNameRef} type="text" />
         <button className='btn' onClick={handleAddTodo}>Add Task</button>
         <button className='btn' onClick={handleClearTodos}>Clear Task</button> 
         <div className='todo'>{todos.filter(todo => !todo.complete).length} left to do</div>
      </div>
    )
  }
   ReactDOM.render(<App />, document.getElementById("root"));
  