import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SHOW_LOGIN_DIALOG,
} from "../constants/authConstants";

export const authReducer = (
  state = { isLogin: false, user: null, showLoginDialog: false },
  action
) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, isLogin: true, user: action.payload };

    case AUTH_LOGOUT:
      return { ...state, isLogin: false, user: null };

    case AUTH_SHOW_LOGIN_DIALOG:
      return { ...state, showLoginDialog: action.payload };
    default:
      return state;
  }
};
