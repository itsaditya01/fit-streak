import Signup from "./components/Signup/Signup";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
