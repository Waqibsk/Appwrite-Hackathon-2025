import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/global/Navbar";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
