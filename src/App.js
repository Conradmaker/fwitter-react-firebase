import React, { useState } from "react";
import RouterComponents from "components/Router";
import { authService } from "mybase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <RouterComponents isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} fwitter</footer>
    </>
  );
}

export default App;
