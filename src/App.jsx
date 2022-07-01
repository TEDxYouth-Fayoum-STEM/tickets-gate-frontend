import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Ticket from "./pages/Ticket";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/t/:ticket" element={<Ticket />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
