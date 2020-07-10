import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGithubAlt } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from 'react-redux';
import { getLoginError, logInAsync, setLoginError } from '../reducers/login';

const LoginScreen = () =>  {
  const dispatch = useDispatch();
  const loginError = useSelector(getLoginError);

  return (
    <div className="loginScreenWrapper">
      <FontAwesomeIcon
        icon={faGithub}
        color="#222222"
        className="logo"
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
            if (e.key === "Enter") dispatch(logInAsync(document.getElementById("token").value.trim()));
          }}
          style={{ borderColor: loginError ? "red" : "#999" }}
          onChange={() => dispatch(setLoginError(false)) }
        />

        <FontAwesomeIcon
          className="loginButton"
          onClick={()=>dispatch(logInAsync(document.getElementById("token").value.trim()))}
          icon={faGithubAlt}
          color="#999999"
          alt="Github Login"
        />
      </div>
    </div>
  );
        }
export default LoginScreen