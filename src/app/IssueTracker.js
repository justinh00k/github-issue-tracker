import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import * as timeago from "timeago.js";
import { useSelector, useDispatch} from "react-redux";
import {getToken, getIssues, getIssuesAsync} from '../reducers/login'

const IssueTracker = ({ repos }) => {
  const token = useSelector(getToken);
  const issues = [...useSelector(getIssues)];
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem("sortOrder" + token) || ["created", false]
  );

  const sortIcon = (
    <FontAwesomeIcon
      icon={sortOrder[1] ? faSortDown : faSortUp}
      color="#222222"
      style={{ position: "absolute", marginLeft: "0.5vw" }}
      alt={`Sorted ${sortOrder[1] ? "Ascending" : "Descending"}`}
    />
  );

  const sortBy = (type) => {
    const newSort = [type, sortOrder[0] === type ? !sortOrder[1] : true];
    setSortOrder(newSort);
    localStorage.setItem("sortOrder" + token, newSort);
  };

  const getSortOrder = (a, b) => {
    switch (sortOrder[0]) {
      case "created":
        return sortOrder[1]
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);

      case "title":
        if (a.title < b.title) return sortOrder[1] ? -1 : 1;
        if (a.title > b.title) return sortOrder[1] ? 1 : -1;
        return 0;

      case "assignee":
        const assigneeA = a.assignee ? a.assignee.login : "";
        const assigneeB = b.assignee ? b.assignee.login : "";
        if (assigneeA < assigneeB) return sortOrder[1] ? -1 : 1;
        if (assigneeA > assigneeB) return sortOrder[1] ? 1 : -1;
        return 0;

      default:
      case "updated":
        return sortOrder[1]
          ? new Date(a.updated_at) - new Date(b.updated_at)
          : new Date(b.updated_at) - new Date(a.updated_at);
    }
  };

  return (
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
        <div id="repos" className="column" style={{ flex: 1 }}>
          <table>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id}>
                  <td
                    style={{
                      backgroundColor:
                        issues[0] && repo.url === issues[0].repository_url
                          ? "#CCC"
                          : "transparent",
                    }}
                    onClick={() => dispatch(getIssuesAsync(repo.url,token))}
                  >
                    {repo.full_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="issues" className="column" style={{ flex: 3 }}>
          <table>
            <tbody>
              {issues.length > 0 && !!issues[0].id ? (
                <tr>
                  <th
                    style={{
                      textDecoration:
                        sortOrder[0] === "title" ? "underline" : "none",
                    }}
                    onClick={() => sortBy("title")}
                  >
                    Title{sortOrder[0] === "title" && sortIcon}
                  </th>
                  <th
                    style={{
                      width: "15%",
                      textDecoration:
                        sortOrder[0] === "created" ? "underline" : "none",
                    }}
                    onClick={() => sortBy("created")}
                  >
                    Created{sortOrder[0] === "created" && sortIcon}
                  </th>
                  <th
                    style={{
                      width: "15%",
                      textDecoration:
                        sortOrder[0] === "updated" ? "underline" : "none",
                    }}
                    onClick={() => sortBy("updated")}
                  >
                    Updated{sortOrder[0] === "updated" && sortIcon}
                  </th>
                  <th
                    style={{
                      width: "15%",
                      textDecoration:
                        sortOrder[0] === "assignee" ? "underline" : "none",
                    }}
                    onClick={() => sortBy("assignee")}
                  >
                    Assignee{sortOrder[0] === "assignee" && sortIcon}
                  </th>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>
                    {issues[0] && !!issues[0].repository_url && (<b>No issues in this repo.</b>)}
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
  );
};

export default IssueTracker;