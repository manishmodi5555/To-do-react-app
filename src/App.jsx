import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinsh, setshowfinsh] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const togglefinsh = (e) => {
    setshowfinsh(!showfinsh)

  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos)
    saveTols()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos)
    saveTols()
  }


  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos)
    saveTols()
  }

  const handlechange = (e) => {
    settodo(e.target.value);
  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveTols()
  }


  return (
    <>
      <Navbar />
      <div className='md:container md:mx-auto mx-3 my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh] md:w-[45%]'>
        <h1 className='font-bold text-center text-3xl'>iTask- Manage Your Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todos</h2>
          <div className="flex">
            <input type="text" className='w-full rounded-full px-5 py-1' onChange={handlechange} value={todo} />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 p-4 mx-2 rounded-full text-sm font-bold py-2 text-white  disabled:bg-violet-700'>Save</button>
          </div>
        </div>
        <input type="checkbox" id='show' onChange={togglefinsh} checked={showfinsh} className='my-4' />
        <label htmlFor="show" className='mx-2'>Show Finshed</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return (showfinsh || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
              <div className='flex gap-5'>
                <input type="checkbox" checked={item.isCompleted} onChange={handlecheckbox} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
