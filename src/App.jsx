import { useState, useEffect } from "react";
import Database from "@tauri-apps/plugin-sql";
import "./App.css";

function App() {
  const [db, setDb] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const initDb = async () => {
      const database = await Database.load("sqlite:mydatabase.db");
      setDb(database);
      const result = await database.select("SELECT * FROM task");
      setTasks(result);
    };

    initDb();
  }, []);

  async function store() {
    if (!db) return;

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!description.trim()) {
      alert("Description is required");
      return;
    }

    await db.execute(
      "INSERT INTO task (title, description, is_completed) VALUES (?, ?, ?)",
      [title, description, isCompleted ? 1 : 0]
    );

    const result = await db.select("SELECT * FROM task");
    setTasks(result);

    setTitle("");
    setDescription("");
    setIsCompleted(false);
  }

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>

      <button onClick={store}>Save Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>{task.is_completed ? "Completed" : "Pending"}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
