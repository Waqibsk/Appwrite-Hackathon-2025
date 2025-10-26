import "./App.css";
import { Routes, Route } from "react-router";
import { SignIn } from "./pages/Signin";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatPost";
import CreateSpace from "./pages/CreateSpace";
import ItemsList from "./components/ItemsList";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create/:id" element={<CreatePost />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/item/:id" element={<PostPage />} />
      <Route path="/item/edit/:id" element={<EditPost />} />
      <Route path="/items/:id" element={<ItemsList />} />
      <Route path="/space/create" element={<CreateSpace />} />
    </Routes>
  );
}

export default App;
