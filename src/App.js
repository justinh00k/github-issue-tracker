import React, { useState } from "react";

import "./App.scss";
import LoginScreen from './app/LoginScreen'
import IssueTracker from './app/IssueTracker'

function App() {
  const [repos, setRepos] = useState(false);
  const [userAndPassword,setUserAndPassword] = useState([])
  const [loginError,setLoginError] = useState(false)

  const login = async (user, password) => {
    if (user && password)
{

      setUserAndPassword([user,password])

      return fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: { Authorization: "Basic " + btoa(`${user}:${password}`) },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
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
        ? <IssueTracker user={userAndPassword[0]} password={userAndPassword[1]} repos={repos} /> 
        :   <LoginScreen loginError={loginError} setLoginError={setLoginError} login={login} />
        }
      </header>
    </div>
  );
}

export default App;
