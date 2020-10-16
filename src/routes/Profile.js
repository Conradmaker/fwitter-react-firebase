import React from "react";
import { authService } from "mybase";

export default function Profile() {
  const onLogout = () => {
    authService.signOut();
  };
  return (
    <>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}
