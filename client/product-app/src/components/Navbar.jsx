import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2>Products</h2>

      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {isLoggedIn && username && (
          <div style={{ position: "relative" }}>
            <span
              style={styles.userBadge}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Hey, {username} ▼
            </span>

            {showDropdown && (
              <div style={styles.dropdown}>
                <Link
                  to="/profile"
                  style={styles.dropdownItem}
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button style={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    backgroundColor: "#172554",
    color: "white",
  },
  link: {
    marginLeft: "15px",
    color: "white",
    textDecoration: "none",
    border: "1px solid white",
    padding: "5px 12px",
    borderRadius: "4px",
    background: "transparent",
    cursor: "pointer",
  },
  userBadge: {
    marginRight: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "35px",
    right: "0",
    background: "white",
    color: "#172554",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minWidth: "120px",
    zIndex: 10,
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  dropdownItem: {
    display: "block",
    padding: "10px",
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    color: "#172554",
  },
};

export default Navbar;
