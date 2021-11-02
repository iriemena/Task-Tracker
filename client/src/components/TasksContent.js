import React from "react";
import { Link } from "react-router-dom";

function TasksContent({ task, deleteTask }) {
  return (
    <tr
      style={{
        fontSize: "12px",
      }}
    >
      <td>{task.username}</td>
      <td>{task.description}</td>
      <td>{task.duration} Mins</td>
      <td>{task.date.substring(0, 10)}</td>
      <td>
        <div style={{ marginLeft: "5px" }}>
          <Link to={`/edit/${task._id}`} style={{ fontSize: "14px" }}>
            <i class="bi bi-pencil-square"></i>
          </Link>{" "}
          |{" "}
          <Link to="#" style={{ color: "red", fontSize: "14px" }}>
            <i className="bi bi-trash" onClick={() => deleteTask(task._id)}></i>
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default TasksContent;
