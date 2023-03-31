import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId,setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if(todo!==''){
      setTodos([...todos, {list : todo , id : Date.now(), status:false}]);
      console.log(todos);
      setTodo("");
    }
    if(editId){
      const editTodo = todos.find((todo => todo.id == editId))
      const updateTodo = todos.map((value) => value.id === editTodo.id
      ? (value = {id : value.id, list : todo})
      :(value={id : value.id,list : value.list}))
      setTodos(updateTodo)
      setEditId(0);
      setTodo('')
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id)=>{
    setTodos(todos.filter((value) => value.id !== id))
  }

  const onComplete = (id)=>{
    let complete = todos.map((list)=>{
      if(list.id === id) {
        return({...list , status: !list.status });
      }
      return list;
    })
    setTodos(complete);
  }

  const onEdit=(id)=>{
    const editTodo = todos.find((value)=> value.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
    console.log(editTodo)
  }

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}> {editId ? 'EDIT':'ADD '}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((value) => (
            <li className="list-items">
              <div className="list-item-list"  id={value.status ? 'list-item':''}>{value.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(value.id)}
                />
                <FiEdit className="list-item-icons" id="edit" title="Edit" onClick = {()=>onEdit(value.id)} />
                <MdDeleteOutline
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(value.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
