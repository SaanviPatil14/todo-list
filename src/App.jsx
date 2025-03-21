import js from '@eslint/js';
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
    //setTodos(todos)
  }

  const handleAdd = () => {
    setTodos([...todos,{id: uuidv4(), todo, isCompleted: false}])
    setTodo(" ")
    saveLS()
  }

  const handleEdit = (e) => {
    let id = e.target.name;
    console.log(id)
    let t= todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveLS()
  }

  const handleDelete = (e) => {
    let id = e.target.name;
    console.log(id)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
  setTodos(newTodos)
  saveLS()
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

 const handleCheckbox = (e) => {
  let id = e.target.name;
  console.log(id)
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  console.log(index)
  let newTodos = [...todos];
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  saveLS()
 }


  return (
    <>
    <div className=" bg-slate-300 min-h-[80vh] my-5 mx-10 p-5">
      <h1 className="text-4xl font-bold text-slate-800 text text-center">To-Do list App</h1>
      <div className="add-box items-center flex justify-center m-4">
        <input onChange={handleChange} value={todo} type="text" className='border-slate-800 border-2 h-8 rounded-md mx-2'/>
        <button className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={handleAdd}>Add</button>
      </div>
      <h2 className='font-bold text-xl'>Your Tasks</h2>
      {todos.map(item=>{
        return <div key={item.id} className="your-todos flex justify-between px-5 w-1/2 my-3">
            <div className='flex gap-5'> 
              <input name={item.id} type='checkbox' value={item.isCompleted} className='mx-2'onChange={handleCheckbox} id="" />
              <label className={item.isCompleted?"line-through":""}>{item.todo}</label>
            </div>
            <div className="button flex h-10">
              <button name={item.id} className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={handleEdit}>Edit</button>
              <button name={item.id} className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={handleDelete}>Delete</button>
            </div>
          </div>
      })}
    </div>
    </>
  )
}

export default App
