import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Tasks from "./components/Tasks";
import CreateTask from "./components/CreateTask";
import CreateUser from "./components/CreateUser";
import EditTask from "./components/EditTask";

function App() {
  return (
    <div className="container">
      <Router>
        <Nav />
        <Route exact path="/" component={Tasks} />
        <Route exact path="/create" component={CreateTask} />
        <Route exact path="/user" component={CreateUser} />
        <Route path="/edit/:id" component={EditTask} />
      </Router>
    </div>
  );
}

export default App;
