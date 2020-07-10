import React from "react";
import { useSelector } from 'react-redux';
import { getRepos } from './reducers/login';

import "./App.scss";
import LoginScreen from './app/LoginScreen'
import IssueTracker from './app/IssueTracker'

document.body.style.backgroundColor = "#F4F4F4"

function App() {
  const repos = useSelector(getRepos) 
  return (
    <div className="App">
        {repos
        ? <IssueTracker repos={repos} /> 
        :   <LoginScreen />
        }
    </div>
  );
}

export default App;
