import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import * as timeago from "timeago.js";
import "./App.scss";

function App() {
  const [repos, setRepos] = useState(false);
  const [user, setUser] = useState("justinh00k");
  const [password, setPassword] = useState(
    "dc1705a477c2f7b1c58b455c407debf0c015e377"
  );
  const [loginError, setLoginError] = useState(false);
  const [issues, setIssues] = useState([]);
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder'+user) || ["created", false]);

  const sortBy = (type) => {
    const newSort = [type, sortOrder[0] === type ? !sortOrder[1] : true];
    setSortOrder(newSort);
    localStorage.setItem('sortOrder'+user, newSort);
  };

  const getSortOrder = (a,b) => {
    switch (sortOrder[0]) {
      case "created":
        return sortOrder[1] ? (new Date(a.created_at) - new Date(b.created_at)) : (new Date(b.created_at) - new Date(a.created_at));

      case "title":
          if (a.title < b.title) return sortOrder[1] ? -1 : 1;
          if (a.title > b.title) return sortOrder[1] ? 1 : -1;
          return 0;
        
      case "assignee":
        const assigneeA = a.assignee ? a.assignee.login : ""
        const assigneeB = b.assignee ? b.assignee.login : ""
          if (assigneeA < assigneeB) return sortOrder[1] ? -1 : 1;
          if (assigneeA > assigneeB) return sortOrder[1] ? 1 : -1;
          return 0;

      default:
      case "updated":
        return sortOrder[1] ? (new Date(a.updated_at) - new Date(b.updated_at)) : (new Date(b.updated_at) - new Date(a.updated_at));
    }
  };

  const fetchIssues = (url) => {
    fetch(url + "/issues", {
      method: "GET",
      headers: { Authorization: "Basic " + btoa(`${user}:${password}`) },
    })
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.length > 0 ? data : [{ repository_url: url }]);
      })
      .catch((error) => console.log(error));
  };

  const login = () => {
    if (login && password)
      fetch("https://api.github.com/user/repos", {
        method: "GET",
        headers: { Authorization: "Basic " + btoa(`${user}:${password}`) },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoginError(false);
          setRepos(data);
        })
        .catch((error) => setLoginError(true));
  };

  return (
    <div className="App">
      <header className="App-header">
        {!repos && (
          <>
            <FontAwesomeIcon
              icon={faGithubAlt}
              color="#222222"
              size="6x"
              className="App-logo"
              alt="Github Logo"
            />

            <h2>Please enter your Github user name and private key.</h2>

            <div className="loginWrapper">
              <input
                id="user"
                placeholder="User name"
                className="loginInput"
                style={{ borderColor: loginError ? "red" : "#999" }}
                value={user}
                onChange={() => {
                  setLoginError(false);
                  setUser(document.getElementById("user").value.trim());
                }}
              />
              <input
                id="password"
                className="loginInput"
                placeholder="Private key"
                onKeyDown={(e) => {
                  if (e.key === "Enter") login();
                }}
                style={{ borderColor: loginError ? "red" : "#999" }}
                value={password}
                onChange={() => {
                  setLoginError(false);
                  setPassword(document.getElementById("password").value.trim());
                }}
              />

              <FontAwesomeIcon
                className="loginButton"
                onClick={login}
                icon={faGithub}
                color="#999999"
                size="3x"
                alt="Github Login"
              />
            </div>
          </>
        )}
        {repos && (
          <div className="loggedInWrapper">
            <h2>
              <FontAwesomeIcon
                icon={faCodeBranch}
                color="#CCC"
                size="1x"
                style={{ marginRight: "1vw" }}
                alt=""
              />
              GitHub Issue Tracker
              <span className="subtitle"> by justinh00k</span>
            </h2>

            <div className="wrapper">
              <div className="column" style={{ flex: 1 }}>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                    </tr>
                    {repos.map((repo) => (
                      <tr key={repo.id}>
                        <td
                          style={{
                            backgroundColor:
                              issues[0] && repo.url === issues[0].repository_url
                                ? "#CCC"
                                : "transparent",
                          }}
                          onClick={() => fetchIssues(repo.url)}
                        >
                          {repo.full_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="column" style={{ flex: 3 }}>
                <table>
                  <tbody>
                    {issues.length > 0 && issues[0].id ? (
                      <tr>
                        <th onClick={() => sortBy("title")}>Title</th>
                        <th onClick={() => sortBy("created")}>Created</th>
                        <th onClick={() => sortBy("updated")}>Updated</th>
                        <th onClick={() => sortBy("assignee")}>Asignee</th>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          {issues[0] &&
                            issues[0].repository_url &&
                            <b>No issues in this repo.</b>}
                        </td>
                      </tr>
                    )}

                    {issues[0] &&
                      issues[0].id &&
                      issues.sort(getSortOrder).map((issue) => (
                        <tr key={issue.id}>
                          <td>{issue.title}</td>
                          <td>{timeago.format(new Date(issue.created_at))}</td>
                          <td>{timeago.format(new Date(issue.updated_at))}</td>
                          <td>
                            {issue.assignee && (
                              <img
                                title={`Avatar of ${issue.assignee.login}`}
                                alt={`Avatar of ${issue.assignee.login}`}
                                className="avatar"
                                src={issue.assignee.avatar_url}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
