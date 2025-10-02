import React, { useState } from "react";
import { addFile } from "../Functions/AllFunctions";

export default function UploadFile({ onFileAdded, currentAccount }) {
  const [title, setTitle] = useState("");
  const [cid, setCid] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleUpload = async () => {
    if (!cid || !title) return alert("Enter CID & title");
    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${cid}`;
    await addFile(ipfsURL, title);
    alert("File added!");
    setCid("");
    setTitle("");
    setShowForm(false);
    onFileAdded();
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h2 style={styles.heading}>Add file by CID</h2>

        {!showForm && (
          <button style={styles.addButton} onClick={() => setShowForm(true)}>
            + Add
          </button>
        )}

        {showForm && (
          <div style={styles.form}>
            <input
              placeholder="Enter IPFS CID"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              style={styles.input}
            />
            <input
              placeholder="File title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
            <div style={styles.buttonGroup}>
              <button style={styles.uploadButton} onClick={handleUpload}>
                Upload
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  left: {
    flex: 1,
    minWidth: "280px",
    maxWidth: "500px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "15px",
    color: "#202124",
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.2rem",
  },
  addButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "10px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #dadce0",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "5px",
    flexWrap: "wrap",
  },
  uploadButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    minWidth: "120px",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#f1f3f4",
    color: "#202124",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    minWidth: "120px",
  },
};

/* ✅ Responsive styles */
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @media (max-width: 768px) {
    h2 { font-size: 1rem !important; }
    button { font-size: 13px !important; padding: 8px !important; }
    input { font-size: 13px !important; }
  }

  @media (max-width: 480px) {
    h2 { font-size: 0.9rem !important; }
    button { font-size: 12px !important; padding: 6px !important; }
    input { font-size: 12px !important; }
  }
`;
document.head.appendChild(styleSheet);
