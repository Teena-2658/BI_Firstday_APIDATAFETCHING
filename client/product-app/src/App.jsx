import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProfilePage from "./pages/ProfilePage"; // ← import ProfilePage
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Check localStorage on page load
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setUsername(user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
      />

      <Routes>
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername} // ← pass setUsername
            />
          }
        />

        {/* Profile Page Route */}
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />

        {/* Home / ProductList */}
        <Route
          path="/"
          element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
