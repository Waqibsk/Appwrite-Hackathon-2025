import "./App.css";
import { Routes, Route } from "react-router";
import { SignIn } from "./pages/Signin";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatPost";
import CreateSpace from "./pages/CreateSpace";
import ItemsList from "./components/ItemsList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/items/:id" element={<ItemsList />} />
      <Route path="/space/create" element={<CreateSpace />} />
    </Routes>
  );
}

export default App;
