'use client';
import {useState, useRef, useEffect} from "react";
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://gfpjuskvthnnmgbbpgrl.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchTodos(){
      let { data: Todos, error } = await supabase
        .from('Todos')
        .select('*') 
      setTodos(Todos);
    }
    fetchTodos();
  }, []);

  function Todo({todo}){
    return(
      <div className={`block add ${todo.done ? 'finished' : ''}`}>
        <button className="circlebutton" onClick={async() => {
          const { data, error } = await supabase
          .from('Todos')
          .update({ done: !todo.done })
          .eq('id', todo.id)
          .select()
        
          const newTodos = todos.map((t) => {
            if (t.id === todo.id){
              return data[0];
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
        <button className="circlebutton" onClick={async() => {
          const { data, error } = await supabase
          .from('Todos')
          .insert([
            { name: inputRef.current.value, done: false },
          ])
          .select()
        
          setTodos([data[0], ...todos])
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
