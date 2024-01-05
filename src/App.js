import "./App.css";
import {
  BrowserRouter,
  useNavigate,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { auth } from "./helper/firebase";
import Register from "./components/Register";
import Login from "./components/Login";
import InfoEntryForm from "./components/InfoEntryForm";
import { PrivateRoute } from "./components/ProtectedRoute";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<InfoEntryForm />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
