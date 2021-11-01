import React from "react";
import { Link } from "react-router-dom";

function TableContent({ task, deleteTask }) {
  return (
    <tr
      style={{
        fontSize: "12px",
      }}
    >
      <td>{task.username}</td>
      <td>{task.description}</td>
      <td>{task.duration} Min</td>
      <td>{task.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${task._id}`}>
          <i class="bi bi-pencil-square"></i>
        </Link>{" "}
        |{" "}
        <Link to="#" style={{ color: "red" }}>
          <i className="bi bi-trash" onClick={() => deleteTask(task._id)}></i>
        </Link>
      </td>
    </tr>
  );
}

export default TableContent;
