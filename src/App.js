import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.scss";

function App() {
  const [whichRepo, setWhichRepo] = useState("");
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (login && password)
      fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: { Authorization: "Basic " + btoa(`${user}:${password}`) },
      })
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
          console.log(data);
        })
        .catch(console.log);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          <input
            id="user"
            value={user}
            onChange={() =>
              setUser(document.getElementById("user").value.trim())
            }
          />
          <input
            id="password"
            value={password}
            onChange={() =>
              setPassword(document.getElementById("password").value.trim())
            }
          />
          <button onClick={login} />
        </p>

        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
