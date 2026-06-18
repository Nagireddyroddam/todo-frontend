import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState([]);
  const [input, setInput] = useState('');

 

  useEffect(() => {
    fetch('https://my-back-end-production.up.railway.app/tasks')
      .then(res => res.json())
      .then(data => setTask(data));
  }, []);
  function addTask(){
    fetch('https://my-back-end-production.up.railway.app/tasks', {
      method:'post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({task: input})
    })
    .then(res => res.json())
    .then(data =>{
      setTask(data);
      setInput(''); 

    });
  }
  function deleteTask(id){
    fetch(`https://my-back-end-production.up.railway.app/tasks/${id}`, {
      method:'DELETE',
    })
    .then(res => res.json())
    .then(data => setTask(data));
  }

  return(
    <div>
      <h1>My Todo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {task.map((task, index) => (
          <li key={index}>
            {task.task}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;