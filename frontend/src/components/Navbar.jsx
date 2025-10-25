import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import "../App.css";

export default function Navbar() {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      alert("Error logging out");
    }
  };

  return (
    <nav style={{ padding: "15px", background: "#007BFF", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <div>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "bold" }}>
            CivicConnect
          </Link>
        </div>
        <div>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Dashboard</Link>
              <Link to="/report" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Report Issue</Link>
              <Link to="/my-reports" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>My Reports</Link>
              {userRole === "admin" && (
                <Link to="/admin" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Admin</Link>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ padding: "5px 15px", fontSize: "14px" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Login</Link>
              <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
