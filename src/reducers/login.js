import { createSlice } from "@reduxjs/toolkit";

export const login = createSlice({
  name: "login",
  initialState: {
    token: "",
    repos: false,
    loginError: false,
    issues: [],
  },
  reducers: {
    setLoginError: (state, { payload }) => {
      state.loginError = payload;
    },
    setRepos: (state, { payload }) => {
      state.repos = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setIssues: (state, { payload }) => {
      state.issues = payload;
    },
  },
});

export const { setLoginError, setRepos, setToken, setIssues } = login.actions;

export const logInAsync = (loginToken) => (dispatch) => {
  if (loginToken) {
    dispatch(setToken(loginToken));

    fetch("https://api.github.com/user/repos", {
      method: "GET",
      headers: { Authorization: `token ${loginToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          dispatch(setRepos(data));
          dispatch(setLoginError(false));
        } else dispatch(setLoginError(true));
      });
  } else dispatch(setLoginError(false));
};

export const getIssuesAsync = (url, token) => (dispatch) => {
  fetch(url + "/issues", {
    method: "GET",
    headers: { Authorization: `token ${token}` },
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch(setIssues(data.length > 0 ? data : [{ repository_url: url }]))
    )
    .catch((error) => console.log(error));
};

export const getIssues = (state) => state.login.issues;
export const getToken = (state) => state.login.token;
export const getRepos = (state) => state.login.repos;
export const getLoginError = (state) => state.login.loginError;

export default login.reducer;
