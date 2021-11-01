import { useState } from "react";
import axios from "axios";
function CreateUser() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userName = { username };
    axios
      .post("http://localhost:4000/api/users/add", userName)
      .then((user) => console.log(user.data));

    setUsername("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a new User</h3>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add User
      </button>
    </form>
  );
}

export default CreateUser;
