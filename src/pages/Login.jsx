import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  async function login() {
    const response = await fetch(
      "https://tedxfay-tickets-gate.herokuapp.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          pass,
        }),
      }
    );
    const data = await response.json();
    if (!data || !data.token) return alert("LOGIN FAILED!");
    localStorage.setItem("token", data.token);
    alert("LOGINED!");
  }

  return (
    <div>
      <input type="text" onChange={(e) => setUser(e.target.value)} />
      <input type="text" onChange={(e) => setPass(e.target.value)} />
      <button onClick={() => login()}>LOGIN</button>
    </div>
  );
}
