import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import "../App.css";

export default function AdminPanel() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get("http://localhost:5000/api/admin/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      if (err.response?.status === 403) {
        alert("Access denied. Admin only.");
        navigate("/dashboard");
      } else {
        alert("Failed to fetch reports");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.put(
        `http://localhost:5000/api/admin/reports/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Status updated successfully!");
      fetchReports(); // Refresh the list
    } catch (err) {
      console.error("Error updating status:", err);
      if (err.response?.status === 403) {
        alert("Access denied. Admin only.");
        navigate("/dashboard");
      } else {
        alert("Failed to update status");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "badge badge-resolved";
      case "In Progress":
        return "badge badge-progress";
      case "Pending":
      default:
        return "badge badge-pending";
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="page-container">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Admin Panel - All Reports</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <p>Total Reports: <strong>{reports.length}</strong></p>
      </div>

      {reports.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No reports submitted yet.</p>
        </div>
      ) : (
        <div>
          {reports.map((report) => (
            <div key={report._id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 10px 0" }}>{report.title}</h3>
                  <p style={{ color: "#666", margin: "0 0 10px 0" }}>{report.description}</p>
                  {report.location?.address && (
                    <p style={{ color: "#888", fontSize: "14px", margin: "5px 0" }}>
                      📍 {report.location.address}
                    </p>
                  )}
                  <p style={{ color: "#888", fontSize: "12px", margin: "5px 0" }}>
                    By: {report.createdBy || "Unknown"}
                  </p>
                  <p style={{ color: "#888", fontSize: "12px", margin: "5px 0" }}>
                    Created: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                  <span className={getStatusClass(report.status)}>
                    {report.status}
                  </span>
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusUpdate(report._id, e.target.value)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
              {report.imageUrl && (
                <img
                  src={report.imageUrl}
                  alt={report.title}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    marginTop: "15px",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
