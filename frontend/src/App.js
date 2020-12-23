import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import CartPage from "./Pages/CartPage";
import { Nav, Navbar, Badge } from "react-bootstrap";
import LoginDialog from "./components/LoginDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SHOW_LOGIN_DIALOG,
} from "./constants/authConstants";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { Cart } from 'react-bootstrap-icons';

function App(props) {
  const firebase = useFirebase();
  const firestore = useFirestore()
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);


  const setShowLogin = useCallback(
    (show) => {
      dispatch({
        type: AUTH_SHOW_LOGIN_DIALOG,
        payload: show,
      });
    },
    [dispatch]
  );

  const setIsLogin = useCallback(
    (isLogin, user = null) => {
      if (!isLogin) {
        dispatch({
          type: AUTH_LOGOUT,
        });
        return;
      }
      dispatch({
        type: AUTH_LOGIN,
        payload: user,
      });
    },
    [dispatch]
  );

  const [cart, setCart] = useState({
    id: null,
    items: [],
    belongTo: null,
  });

  useEffect(() => {
    const unsubscribe = firestore
      .collection("carts")
      .doc('test_cart')
      .onSnapshot(snapshot => {
        setCart(snapshot.data());
      })
    return () => unsubscribe()
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          setIsLogin(false);
          return;
        }
        setShowLogin(false);
        setIsLogin(true, user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <Router>
      <div>
        <Navbar className="bg-main" expand="md">
          <Link to="/">
            <Navbar.Brand href="#home">JASMINE</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {auth.isLogin ? (
                <Nav.Link href="/cart">
                  <Cart size={24} >

                  </Cart><Badge variant="danger">{cart.items.length}</Badge>
                </Nav.Link>
              ) : null}

              {auth.isLogin ? (
                <Nav.Link href="/profile">Profile</Nav.Link>
              ) : null}
              {auth.isLogin ? (
                <Nav.Link
                  title="Logout"
                  onClick={() => firebase.auth().signOut()}
                >
                  Logout
                </Nav.Link>
              ) : (
                  <Nav.Link title="Login" onClick={() => setShowLogin(true)}>
                    Login
                  </Nav.Link>
                )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <LoginDialog
          show={auth.showLoginDialog}
          onHide={() => setShowLogin(false)}
          callback={setIsLogin}
        ></LoginDialog>

        <main>
          <Route path="/cart/:id?" component={CartPage} />

          <Route path="/" exact={true} component={HomePage} />
          <Route path="/profile" component={ProfilePage} />
        </main>
      </div>
    </Router>
  );
}

export default App;
