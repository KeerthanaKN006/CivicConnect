import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 style={{ marginTop: "50px" }}>Welcome to CivicConnect!</h1>
      <p style={{ fontSize: "18px", margin: "20px 0", color: "#666" }}>
        Hello, {user?.email}
      </p>
      
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "40px", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/report")}
          className="btn btn-primary"
        >
          Report an Issue
        </button>
        
        <button
          onClick={() => navigate("/my-reports")}
          className="btn btn-success"
        >
          My Reports
        </button>
      </div>
    </div>
  );
}
