import React, { useState } from "react";

import "./App.scss";
import LoginScreen from './app/LoginScreen'
import IssueTracker from './app/IssueTracker'

function App() {
  const [repos, setRepos] = useState(false);
  const [token,setToken] = useState("")
  const [loginError,setLoginError] = useState(false)

  const login = async (loginToken) => {
    if (loginToken)
{
      setToken(loginToken)
      return fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: { Authorization: `token ${token}`},
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)){
          setRepos(data);
          setLoginError(false)
          }
          else setLoginError(true)
        })
        .catch(()=>{
          setLoginError(true)
        });
      }
      else
      setLoginError(true)
  };

  return (
    <div className="App">
      <header className="App-header">
        {repos 
        ? <IssueTracker token={token} repos={repos} /> 
        :   <LoginScreen loginError={loginError} setLoginError={setLoginError} login={login} />
        }
      </header>
    </div>
  );
}

export default App;
