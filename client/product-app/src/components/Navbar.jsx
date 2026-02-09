import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h2>Products</h2>

      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn && (
  <span style={styles.userBadge}>
  Hey, {username}
</span>

)}

        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.link}>
            Logout
          </button>
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
};

export default Navbar;
