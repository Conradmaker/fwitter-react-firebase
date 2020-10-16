import React, { useEffect, useState } from "react";
import RouterComponents from "components/Router";
import { authService } from "mybase";

export default function App() {
  const [userObj, setUserobj] = useState(null);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserobj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init && <RouterComponents isLoggedIn={isLoggedIn} user={userObj} />}
      <footer>&copy; {new Date().getFullYear()} fwitter</footer>
    </>
  );
}
