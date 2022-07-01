import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Ticket() {
  const [state, setState] = useState(null);

  const navigate = useNavigate();
  const { ticket } = useParams();

  async function load() {
    const response = await fetch(
      "https://tedxfay-tickets-gate.herokuapp.com/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          ticket: ticket,
        }),
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      return alert("PLEASE LOGIN!");
    }
    if (!data || !data.status) {
      return alert("TICKET NOT VALID!");
    }
    setState(data);
  }

  async function register() {
    const response = await fetch(
      "https://tedxfay-tickets-gate.herokuapp.com/enter",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          ticket: ticket,
        }),
      }
    );
    if (response.status !== 200) return alert("OPERATION FAILED!");
    alert("OPERATION SUCCEEDED!");
    navigate({
      to: "/main",
    });
  }

  useEffect(() => {
    load();
  });

  return state ? (
    <div>
      <p>Name: {state.name}</p>
      <p>Email: {state.email}</p>
      <p>Whatsapp Number: {state.wa_nu}</p>
      <p>Pack: {state.pack}</p>
      <button onClick={register}>ENTER</button>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
