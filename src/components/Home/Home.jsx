
import "./Home.css";
import Navbar from "../navbar/Navbar";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  
const handleSubmit = (e) => {
  e.preventDefault();   // stop page refresh

  const form = e.target;

  const newTask = {
    name: form["task-name"].value,
    description: form["task-desc"].value,
    difficulty: form["task-difficulty"].value,
    dueDate: form["due-date"].value,
  };

  setTasks(prev => [...prev, newTask]);

  form.reset();   // optional: clears the form
};
  return (
    <main className="container">
      <Navbar />
      <div className="home-content">
        <div className="task-form">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="task-name">Task Name:</label>
              <input type="text" id="task-name" name="task-name" />
              <label htmlFor="task-desc">Description:</label>
              <textarea id="task-desc" name="task-desc"></textarea>
              <label htmlFor="task-difficulty">Difficulty:</label>
              <select id="task-difficulty" name="task-difficulty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label htmlFor="due-date">Due Date:</label>
              <input type="date" id="due-date" name="due-date" />
              <div className="notification-settings" style={{ marginTop: "20px" }}>
              <label htmlFor="notifications">Enable Notifications:</label>
              <input type="checkbox" id="notifications" name="notifications" />
              </div>
              <label htmlFor="notification-time">Notification Time:</label>
              <input type="time" id="notification-time" name="notification-time" />
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="priority-list">
          <h2>Task List</h2>
          <div className="tasks">
           {tasks.map((task, index) => (
  <div key={index} className="task-item">
    <h3>{task.name}</h3>
    <p>{task.description}</p>
    <p>Difficulty: {task.difficulty}</p>
    <p>Due Date: {task.dueDate}</p>
  </div>
))}
            </div>
        </div>
      </div>
    </main>
  );
}