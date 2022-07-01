import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Ticket() {
  const [state, setState] = useState(null);

  const [searchParams] = useSearchParams();

  async function load() {
    const response = await fetch(`${process.env.API_URL}/check`, {
      method: "POST",
      body: {
        token: localStorage.getItem("token"),
        ticket: searchParams.get("ticket"),
      },
    });
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
