import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: usernameInput, password }),
        }
      );

      const data = await res.json();
      console.log("LOGIN RESPONSE 👉", data);

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // ✅ Save username and update state
      localStorage.setItem("username", usernameInput);
      setIsLoggedIn(true);
      setUsername(usernameInput); // ← important to update Navbar instantly
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Server not reachable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
