import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2>Products</h2>
      <div>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Sign Up</Link>
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
  },
};

export default Navbar;
