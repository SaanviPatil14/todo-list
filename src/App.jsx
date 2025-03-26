import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

    // Load tasks from localStorage when the app starts
    useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    }, []);
  
    // Save tasks to localStorage every time `todos` changes
    const saveToLocalStorage = (updatedTodos) => {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };
  
    const handleAdd = () => {
      if (!todo.trim()) return;//trim removes spaces,new lines,tabs
  
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      setTodos(updatedTodos); //all todos saved to updated todos
      saveToLocalStorage(updatedTodos); // updated todos saved to local storage
      setTodo('');
    };
  
    const handleEdit = (id) => {
      const taskToEdit = todos.find((i) => i.id === id);//find= finds the first obj that satisfy the condition
      setTodo(taskToEdit.todo);
  
      const updatedTodos = todos.filter((item) => item.id !== id);//creates an array with the edited task
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    };
  
    const handleDelete = (id) => {
      const updatedTodos = todos.filter((item) => item.id !== id);//creates a array of all tasks except the task to be deleted
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    };
  
    const handleCheckbox = (id) => {
      const updatedTodos = todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      setTodos(updatedTodos);
      saveToLocalStorage(updatedTodos);
    };
  
    const handleChange = (e) => setTodo(e.target.value);

  return (
    <>
    <div className=" bg-rose-100 min-h-[90vh] my-5 md:mx-10 md:p-5 rounded-md mx-5 p-2 lg:w-1/2 lg:mx-auto">
      <h1 className="text-4xl font-bold text-slate-800 text text-center">To-Do list App</h1>
      <div className="add-box items-center flex justify-center m-4">
        <input placeholder="Enter your task..." onChange={handleChange} value={todo} type="text" className='border-slate-800 border-2 h-8 rounded-md mx-2 w-72'/>
        <button className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={handleAdd}>Add</button>
      </div>
      <h2 className='font-bold text-xl'>Your Tasks</h2>
      {!todos.length && <p className="text-center text-gray-600">No tasks yet. Add some!</p>}
      {todos.map(item=>{
        return <div key={item.id} className="your-todos flex justify-between md:px-5  my-3 items-center px-2 lg:mx-auto">
            <div className='flex md:gap-5 w-68 gap-2 md:w-80'> 
            <input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckbox(item.id)} className="mx-2"/>
            
              <label className={item.isCompleted?"line-through":""}>{item.todo}</label>
            </div>
            <div className="button flex h-10">
              <button name={item.id} className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={() => handleEdit(item.id)}>Edit</button>
              <button name={item.id} className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1'onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
      })}
    </div>
    </>
  )
}

export default App
