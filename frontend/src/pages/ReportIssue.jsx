// src/pages/ReportIssue.jsx
import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await auth.currentUser.getIdToken(); // Firebase ID token
      const res = await axios.post(
        "http://localhost:5000/api/reports",
        {
          title,
          description,
          location: { address },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Report created:", res.data);
      alert("✅ Report submitted!");
      // Clear form
      setTitle("");
      setDescription("");
      setAddress("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Report an Issue</h2>
      <form onSubmit={submitReport}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px", width: "300px" }}
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px", width: "300px", height: "100px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Location Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ padding: "8px", margin: "5px", width: "300px" }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
