import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import "../App.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user in MongoDB
      await axios.post("http://localhost:5000/api/users", {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: name || "",
      });
      
      alert("✅ Registration successful! Logged in.");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={handleRegister} style={{ marginTop: "50px" }}>
        <h2>Create Account</h2>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="input-field"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-success"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#007BFF", cursor: "pointer", textDecoration: "underline" }}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
