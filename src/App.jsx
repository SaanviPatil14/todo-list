import { useState } from 'react'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState([])

  const handleAdd = () => {
    setTodos([...todos,{todo, isCompleted: false}])
    setTodo(" ")
    console.log(todos)
  }

  const handleEdit = () => {
    
  }

  const handleDelete = () => {
    
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

 const handleCheckbox = (e) => {
  console.log(e.target.value , e.target.checked);
  if(e.target.checked){
    setNewTodo([...newTodo,e.target.value])
  }
  console.log(newTodo);
  newTodo.isCompleted = !newTodo.isCompleted;
  setTodos(newTodo)
  
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
              <input name={item.id} type='checkbox' value={item.todo} className='mx-2'onChange={handleCheckbox} />
              <label className={item.isCompleted?"line-through":""} className="text-xl" >{item.todo}</label>
            <div className="button">
              <button className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={handleEdit}>Edit</button>
              <button className='bg-slate-700 rounded-md p-2 hover:bg-slate-500 text-white mx-1' onClick={handleDelete}>Delete</button>
            </div>
          </div>
      })}
    </div>
    </>
  )
}

export default App
