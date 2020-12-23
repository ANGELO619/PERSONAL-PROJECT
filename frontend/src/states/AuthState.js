import React, { useEffect, useRef } from "react";
import { useFirebase } from "react-redux-firebase";

export default function useAuthState(props) {
  const firebase = useFirebase();
  const user = useRef();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((currentUser) => {
        user.current = currentUser;
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return user.current;
}
