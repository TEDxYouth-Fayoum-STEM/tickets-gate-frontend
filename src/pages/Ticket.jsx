import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Ticket() {
  const [state, setState] = useState(null);

  const { ticket } = useParams();

  async function load() {
    const response = await fetch(
      "https://tedxfay-tickets-gate.herokuapp.com/check",
      {
        method: "POST",
        body: {
          token: localStorage.getItem("token"),
          ticket: ticket,
        },
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

  useEffect(() => {
    load();
  });

  return state ? (
    <div>
      <p>Name: {state.name}</p>
      <p>Email: {state.email}</p>
      <p>Whatsapp Number: {state.wa_nu}</p>
      <p>Pack: {state.pack}</p>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
