import { useState, useEffect } from "react";
import axios from "axios";
import TasksContent from "./TasksContent";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((items) => setTasks(items.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteTask = (id) => {
    axios
      .delete("/api/tasks/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    const del = tasks.filter((task) => task._id !== id);
    setTasks(del);
  };

  return (
    <div>
      <h5 style={{ marginTop: "20px" }}>List of Tasks</h5>
      <div class="table-responsive">
        <table className="table table-sm">
          <thead
            className="table-light"
            style={{
              fontSize: "14px",
            }}
          >
            <tr>
              <th>Name</th>
              <th>Agenda</th>
              <th>Time</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              return <TasksContent task={task} deleteTask={deleteTask} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
