'use client';
import {useState, useRef} from "react";



  const initialTodos = [
    {
      id: 1,
      name: "Calculus HW2",
      done: false,
    },
    {
      id: 2,
      name: "Side Project Figma",
      done: false,
    },
    {
      id: 3,
      name: "Course Slide",
      done: false,
    },
    {
      id: 4,
      name: "Write Blog Post",
      done: true,
    },
    {
      id: 5,
      name: "Test",
      done: true,
    },
  ];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const inputRef = useRef(null);
  function Todo({todo}){
    return(
      <div className={`block add ${todo.done ? 'finished' : ''}`}>
        <button className="circlebutton" onClick={() => {
          const newTodos = todos.map((t) => {
            if (t.id === todo.id){
              return {
                ...t,
                done: !t.done,
              }
            }
            return t});
            setTodos(newTodos);
            }}></button>
        <p>{todo.name}</p>
      </div>
    )
  }
  const arr = todos.map((todo)=>(
  <div className="content">
    <button class="circlebutton"></button>
    <div>{todo.name}</div>
  </div>
  ));

  return (
    <div className= "todo">
    <div className="list">
    <h1 className="title">
        TODO
    </h1>
    <div className="block enter">
        <button className="circlebutton" onClick={() => 
          {setTodos([{
            id: todos.length + 1,
            name: inputRef.current.value,
            done: false
          }, ...todos])
          inputRef.current.value = '';
          }}>+</button>
        <input 
          ref = {inputRef}
          type="text" 
          placeholder="Create a new todo..." 
          className="defaulttext"
        />
    </div>
    <div className="content">
      {todos.map((todo)=>(
      <Todo todo = {todo} key={todo.id}/>
      ))}
    </div>
    </div>
    </div>
    
  );
}
