import { useState ,useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(()=>{
    const savedTodo = localStorage.getItem("todos");
    if(savedTodo){
      return JSON.parse(savedTodo);
    }else{
      return [];
    }
  })
  // as use state is asynchronous so we need to use useEffect to save the todos in local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // const savetoL = ()=>{
  //   let todo = localStorage.setItem("todos",JSON.stringify(todos))
  //   setTodos(todo)
  // }

  const handleEdit = (e)=>{
    let id = e.target.id;
    let t = todos.filter(i=> i.id === id)[0].todo; // filter return an array so we need to access the first element of the array to get the todo value
    setTodo(t);
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
  }
  const handleDelete = (e)=>{
    let id = e.target.id;
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
    // savetoL()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  const handleAdd = ()=>{
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    // savetoL()
  }
  const handleClick = (e)=>{
    let id = e.target.name;
    console.log(id)
    setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo));
  }
  return (
    <>
    <Navbar/>
    <div className="container flex flex-col bg-purple-100 mx-auto my-5 w-170 p-2 h-170 rounded-xl shadow-lg">
      <div className="header">
        <h1 className="font-extrabold text-3xl text-center">Manage your Todos at one place</h1>
        <h2 className="m-4 font-bold text-xl text-center">Add a Todo</h2>
        <div className="submit flex gap-3 mx-3">
          <input type="text" placeholder='Enter your Task' value={todo} onChange={handleChange} className='border p-2 rounded-2xl w-full bg-white'/>
          <button onClick={handleAdd} disabled={(todo.trim()).length<3} className='text-white font-bold bg-purple-500 disabled:bg-purple-700 disabled:cursor-not-allowed px-4 py-2 rounded-3xl cursor-pointer hover:bg-purple-400 transition-all duration-300'>Save</button>
        </div>
      </div>
      <div className="todos flex flex-col my-7 mx-3">
        {todos.map((items)=>{
          return(
            <div key={items.id} className="todo flex w-full justify-between border border-purple-600 rounded-lg p-2 m-1">
              <div className='flex gap-4 items-center w-120 text-xl text-justify'>
                <input type="checkbox" name={items.id} checked={items.isCompleted} onChange={handleClick}/>
                <div className={items.isCompleted?"line-through":""} style={{width:"400px"}}>{items.todo}</div>
              </div>
              <div className="buttons flex gap-3 items-center">
                <button onClick={handleEdit} id={items.id} className="bg-purple-700 text-white font-bold rounded-3xl px-4 py-2 cursor-pointer hover:bg-purple-500 transition-all duration-300">{<FaEdit />}</button>
                <button onClick={handleDelete} id={items.id} className="bg-purple-700 text-white font-bold rounded-3xl px-3 py-2 cursor-pointer hover:bg-purple-500 transition-all duration-300">{<MdDelete />}</button>
              </div>
            </div>
        )})}
      </div>
    </div>

    </>
  )
}

export default App
