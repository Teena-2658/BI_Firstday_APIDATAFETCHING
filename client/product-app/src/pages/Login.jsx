import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameInput,
            password,
            role,
          }),
        }
      );

      const data = await res.json();
      console.log("LOGIN RESPONSE 👉", data);

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // store token
      localStorage.setItem("token", data.token);

      // store user info
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);
if (data.user.role === "vendor") {
  navigate("/add-product");
} else {
  navigate("/products");
}

    } catch (error) {
      console.error(error);
      alert("Server not reachable");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="customer"
                checked={role === "customer"}
                onChange={(e) => setRole(e.target.value)}
                className="accent-pink-600"
              />
              Customer
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="vendor"
                checked={role === "vendor"}
                onChange={(e) => setRole(e.target.value)}
                className="accent-pink-600"
              />
              Vendor
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
