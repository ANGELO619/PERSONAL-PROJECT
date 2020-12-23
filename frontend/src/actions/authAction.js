import { AUTH_LOGIN, AUTH_LOGOUT } from "../constants/authConstants";

export const login = (user) => (dispatch, getState) => {
  dispatch({
    type: AUTH_LOGIN,
    payload: user,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: AUTH_LOGOUT,
  });
};
