import React, { useState, useEffect } from "react";
import { shareFile, deleteFile } from "../Functions/AllFunctions";

export default function FileList({ files, reloadFiles }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTypes, setFileTypes] = useState({}); // { fileId: mimeType }

  // Fetch MIME types of files
  useEffect(() => {
    files.forEach(async (file) => {
      try {
        const res = await fetch(file.path, { method: "HEAD" });
        const type = res.headers.get("Content-Type");
        setFileTypes((prev) => ({ ...prev, [file.id]: type }));
      } catch (err) {
        console.error("Failed to get file type:", err);
      }
    });
  }, [files]);

  const handleClose = () => setSelectedFile(null);

  const handleShare = async () => {
    if (!selectedFile) return;
    const userAddress = prompt("Enter the Ethereum address to share with:");
    if (!userAddress) return;
    await shareFile(selectedFile.id, userAddress);
    alert("File shared!");
    reloadFiles();
  };

  const handleDelete = async () => {
    if (!selectedFile) return;
    await deleteFile(selectedFile.id);
    alert("File deleted!");
    handleClose();
    reloadFiles();
  };

  const renderPreview = (file, height = "160px") => {
    const type = fileTypes[file.id];

    if (!type) {
      return (
        <div
          style={{
            width: "100%",
            height,
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}
        >
          Loading...
        </div>
      );
    }

    if (type.startsWith("image")) {
      return (
        <img
          src={file.path}
          alt={file.title}
          style={{ width: "100%", height, objectFit: "cover" }}
        />
      );
    } else if (type === "application/pdf") {
      return (
        <iframe
          src={file.path}
          title={file.title}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      );
    } else {
      return (
        <div
          style={{
            width: "100%",
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
            color: "#666",
            padding: "5px",
            textAlign: "center",
          }}
        >
          <a
            href={file.path}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2" }}
          >
            Download {file.title}
          </a>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>My Files</h2>
      <button onClick={reloadFiles}>Load My Files</button>

      {/* File grid */}
      <div className="file-grid">
        {files.map((f) => (
          <div
            key={f.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => setSelectedFile(f)}
          >
            {/* File preview */}
            <div style={{ position: "relative" }}>
              {renderPreview(f)}
              {/* Action buttons on top */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  display: "flex",
                  gap: "6px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    setSelectedFile(f);
                    handleShare();
                  }}
                  style={{
                    fontSize: "12px",
                    padding: "4px 6px",
                    border: "none",
                    borderRadius: "4px",
                    background: "#1976d2",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Share
                </button>
                <button
                  onClick={() => {
                    setSelectedFile(f);
                    handleDelete();
                  }}
                  style={{
                    fontSize: "12px",
                    padding: "4px 6px",
                    border: "none",
                    borderRadius: "4px",
                    background: "#d32f2f",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Del
                </button>
              </div>
            </div>

            {/* File info */}
            <div style={{ padding: "10px", textAlign: "left" }}>
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontWeight: "bold",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {f.title}
              </p>
              <small style={{ display: "block", color: "#666" }}>ID: {f.id}</small>
              <small style={{ display: "block", color: "#666" }}>Owner: {f.owner}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged view */}
      {selectedFile && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              width: "80%",
              height: "80%",
              overflow: "hidden",
              position: "relative",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top-right share/delete */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                gap: "10px",
              }}
            >
              <button onClick={handleShare}>Share</button>
              <button onClick={handleDelete}>Delete</button>
            </div>

            {/* File preview */}
            <div style={{ flex: 1, width: "100%" }}>
              {renderPreview(selectedFile, "100%")}
            </div>

            <p style={{ marginTop: "15px", fontWeight: "bold" }}>{selectedFile.title}</p>
            <small style={{ display: "block" }}>ID: {selectedFile.id}</small>
            <small style={{ display: "block" }}>Owner: {selectedFile.owner}</small>

            <button
              onClick={handleClose}
              style={{
                marginTop: "15px",
                padding: "6px 12px",
                background: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                alignSelf: "flex-start",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Responsive grid styles */}
      <style>{`
        .file-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }
        @media (max-width: 1024px) {
          .file-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .file-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
