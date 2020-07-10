import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";


const LoginScreen = ({ login, loginError, setLoginError }) => {
    const [user, setUser] = useState("justinh00k");
    const [password, setPassword] = useState(
      "dc1705a477c2f7b1c58b455c407debf0c015e377"
    );
    
  return (
    <>
      <FontAwesomeIcon
        icon={faGithub}
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
            if (e.key === "Enter") login(user, password);
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
          onClick={()=>login(user, password)}
          icon={faGithubAlt}
          color="#999999"
          size="3x"
          alt="Github Login"
        />
      </div>
    </>
  );
};

export default LoginScreen