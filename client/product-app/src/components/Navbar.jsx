import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
const navigate = useNavigate();
const [showDropdown, setShowDropdown] = useState(false);

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const handleLogout = () => {
localStorage.removeItem("user");
localStorage.removeItem("token");
setIsLoggedIn(false);
navigate("/login");
};

return ( <nav style={styles.nav}>
<h2 style={{ color: "#1f2937" }}>Products</h2>


  <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
    
    {/* HOME — visible to everyone */}
    <Link to="/" style={styles.link}>
      Home
    </Link>

    {/* Logged In User */}
    {isLoggedIn && user ? (
      <div style={{ position: "relative" }}>
        
        <span
          style={styles.userBadge}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Hey, {user.username} ▼
        </span>

        {showDropdown && (
          <div style={styles.dropdown}>

            <div style={styles.roleBox}>
              Role: {user.role}
            </div>

            {/* Vendor Option */}
            {user.role === "vendor" && (
              <>
                <Link
                  to="/vendor-dashboard"
                  style={styles.dropdownItem}
                  onClick={() => setShowDropdown(false)}
                >
                  Vendor Dashboard
                </Link>

                <Link
                  to="/profile"
                  style={styles.dropdownItem}
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
              </>
            )}

            {/* Customer Option */}
            {user.role === "customer" && (
              <Link
                to="/orders"
                style={styles.dropdownItem}
                onClick={() => setShowDropdown(false)}
              >
                My Orders
              </Link>
            )}

            <button
              style={styles.dropdownItem}
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}
      </div>
    ) : (
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
backgroundColor: "white",
borderBottom: "1px solid #eee",
},

link: {
marginLeft: "15px",
color: "white",
textDecoration: "none",
backgroundColor: "#ec4899",
padding: "6px 14px",
borderRadius: "6px",
cursor: "pointer",
fontWeight: "500",
},

userBadge: {
fontWeight: "bold",
cursor: "pointer",
backgroundColor: "#ec4899",
color: "white",
padding: "6px 12px",
borderRadius: "6px",
},

dropdown: {
position: "absolute",
top: "35px",
right: "0",
background: "white",
border: "1px solid #eee",
borderRadius: "6px",
minWidth: "160px",
zIndex: 10,
boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
},

dropdownItem: {
display: "block",
padding: "10px",
width: "100%",
textAlign: "left",
background: "#ec4899",
border: "none",
cursor: "pointer",
textDecoration: "none",
color: "white",
borderRadius: "4px",
margin: "4px 0",
},

roleBox: {
padding: "8px 10px",
fontSize: "13px",
fontWeight: "bold",
borderBottom: "1px solid #eee",
},
};

export default Navbar;
