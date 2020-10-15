import React, { useEffect, useState } from "react";
import RouterComponents from "components/Router";
import { authService } from "mybase";

export default function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init && <RouterComponents isLoggedIn={isLoggedIn} />}
      <footer>&copy; {new Date().getFullYear()} fwitter</footer>
    </>
  );
}
