import "./App.css";
import { Routes, Route } from "react-router";
import { SignIn } from "./pages/Signin";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
