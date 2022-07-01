import { useState } from "react";

export default function Login() {
  const { user, setUser } = useState("");
  const { pass, setPass } = useState("");

  async function login() {
    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      body: {
        user,
        pass,
      },
    });
    const data = await response.json();
    if (!data || !data.token) return alert("LOGIN FAILED!");
    localStorage.setItem("token", data.token);
  }

  return (
    <div>
      <input type="text" onInput={setUser} />
      <input type="text" onInput={setPass} />
      <button onClick={login}>LOGIN</button>
    </div>
  );
}
