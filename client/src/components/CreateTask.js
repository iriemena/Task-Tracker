import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTask(props) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());

  //   getting users from database
  useEffect(() => {
    axios.get("/api/users").then((users) => {
      setUsers(users.data.map((user) => user.username));

      //   selected user
      setUsername(users.data[0].username);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      username,
      description,
      duration,
      date,
    };

    axios
      .post("/api/tasks/add", task)
      .then((user) => console.log(user))
      .catch((err) => console.log(err));

    setUsername("");
    setDescription("");
    setDuration("");
    setDate("");
    props.history.push("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a new Task</h3>
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
        Add Task
      </button>
    </form>
  );
}

export default CreateTask;
