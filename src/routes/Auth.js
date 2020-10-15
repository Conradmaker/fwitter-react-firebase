import { authService } from "mybase";
import React, { useState } from "react";

export default function Auth() {
  const [input, setInput] = useState({ email: "", password: "" });
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
      console.error(e);
    }
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
        <div>
          <button>Continue with Google</button>
          <button>Continue with GitHub</button>
        </div>
      </form>
    </div>
  );
}
