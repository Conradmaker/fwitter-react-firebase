import { authService, firebaseInstance } from "mybase";
import React, { useState } from "react";

export default function Auth() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [newAccount, setNewAccount] = useState(true);
  const { email, password } = input;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <button type="submit">Log In</button>
        <span>{error}</span>
        <div>
          <span onClick={toggleAccount}>{newAccount ? "LogIn" : "SignUp"}</span>
        </div>
        <div>
          <button onClick={onSocialClick} name="google">
            Continue with Google
          </button>
          <button onClick={onSocialClick} name="github">
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
