import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function EditTask(props) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tasks/" + props.match.params.id)
      .then((response) => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      });

    axios.get("http://localhost:4000/api/tasks").then((res) => {
      const item = res.data.map((user) => user.username);
      setUsers(item);
    });
  }, [props.match.params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      username,
      description,
      duration,
      date,
    };

    axios
      .put(
        "http://localhost:4000/api/tasks/update/" + props.match.params.id,
        task
      )
      .then((user) => console.log(user));

    props.history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Task</h3>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <select
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          {users.map((user) => {
            return (
              <option value={user} key={user}>
                {user}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Duration
        </label>
        <input
          type="text"
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Date:
        </label>
        <div>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Update Task
      </button>
    </form>
  );
}

export default EditTask;
