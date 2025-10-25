import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../App.css";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");
      const userReports = res.data.filter(
        (report) => report.createdBy === user?.email
      );
      setReports(userReports);
    } catch (err) {
      console.error("Error fetching reports:", err);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
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
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>My Reports</h2>
      
      {reports.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>No reports submitted yet.</p>
        </div>
      ) : (
        <div>
          {reports.map((report) => (
            <div key={report._id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h3 style={{ margin: "0 0 10px 0" }}>{report.title}</h3>
                  <p style={{ color: "#666", margin: "0 0 10px 0" }}>
                    {report.description}
                  </p>
                  {report.location?.address && (
                    <p style={{ color: "#888", fontSize: "14px", margin: "5px 0" }}>
                      📍 {report.location.address}
                    </p>
                  )}
                  <p style={{ color: "#888", fontSize: "12px", margin: "5px 0" }}>
                    Created: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={getStatusClass(report.status)}>
                  {report.status}
                </span>
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
