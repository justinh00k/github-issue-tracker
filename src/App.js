import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCodeBranch} from  '@fortawesome/free-solid-svg-icons'
import { faGithub,faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import "./App.scss";

function App() {
  const [whichRepo, setWhichRepo] = useState("");
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginError,setLoginError] = useState(false)

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
        .catch(setLoginError(true));
  };

  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faGithubAlt} color="#222222" size="6x" className="App-logo" alt="Github Logo"  />

        <h2>Please enter your Github user name and private key.</h2>

        <div style={{marginTop: '2vmin', display: 'flex'}}>
          <input
            id="user"
            placeholder="User name"
            className="loginInput"
            style={{borderColor: loginError && user !== ''  ? 'red' : '#999'}}
            value={user}
            onChange={() =>
              setUser(document.getElementById("user").value.trim())
            }
          />
          <input
            id="password"
            className="loginInput"
            placeholder="Private key"
            style={{borderColor: loginError && password !== ''  ? 'red' : '#999'}}
            value={password}
            onChange={() =>
              setPassword(document.getElementById("password").value.trim())
            }
          />

<FontAwesomeIcon style={{cursor: 'pointer'}} onClick={login} icon={faGithub} color="#999999" size="3x" className="Login" alt="Github Login"  />

        </div>

      </header>
    </div>
  );
}

export default App;
