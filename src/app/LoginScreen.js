import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";


const LoginScreen = ({ login, loginError, setLoginError }) => {
    const [token, setToken] = useState(
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

      <h2>Please enter your Github <a href="https://github.com/settings/tokens">token</a>.</h2>

      <div className="loginWrapper">
        
        <input
          id="token"
          className="loginInput"
          placeholder="Token"
          size={45}
          onKeyDown={(e) => {
            if (e.key === "Enter") login(token);
          }}
          style={{ borderColor: loginError ? "red" : "#999" }}
          value={token}
          onChange={() => {
            setLoginError(false);
            setToken(document.getElementById("token").value.trim());
          }}
        />

        <FontAwesomeIcon
          className="loginButton"
          onClick={()=>login(token)}
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