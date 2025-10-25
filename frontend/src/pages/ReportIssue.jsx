// src/pages/ReportIssue.jsx
import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import "../App.css";

export default function ReportIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      return ""; // No image to upload
    }

    setUploading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload image. Please try again.");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const submitReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Upload image if exists
      const uploadedImageUrl = await handleImageUpload();
      
      const token = await auth.currentUser.getIdToken();
      const res = await axios.post(
        "http://localhost:5000/api/reports",
        {
          title,
          description,
          location: { address },
          imageUrl: uploadedImageUrl || "",
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
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      if (!error.response?.status === 400) {
        // Only show generic error if it's not an upload error
        alert("❌ Failed to submit report");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <h2 style={{ marginTop: "50px", marginBottom: "30px" }}>Report an Issue</h2>
      <form onSubmit={submitReport}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input-field"
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="textarea-field"
          style={{ height: "100px" }}
        />
        <br />
        <input
          type="text"
          placeholder="Location Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="input-field"
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: "10px 0" }}
        />
        {imagePreview && (
          <>
            <div style={{ margin: "10px 0" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "300px",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
          </>
        )}
        {uploading && (
          <p style={{ color: "#007BFF", margin: "5px 0" }}>
            ⬆️ Uploading image...
          </p>
        )}
        <br />
        <button
          type="submit"
          disabled={loading || uploading}
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
        >
          {uploading ? "Uploading image..." : loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
