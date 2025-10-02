import React, { useState } from "react";
import { deleteFile } from "../Functions/AllFunctions";

export default function DeleteFile({ onFileDeleted }) {
  const [deleteId, setDeleteId] = useState("");

  const handleDelete = async () => {
    if (!deleteId) return alert("Enter file ID");
    await deleteFile(deleteId);
    alert("File deleted!");
    setDeleteId("");
    onFileDeleted();
  };

  return (
    <div>
      <h2>Delete File</h2>
      <input placeholder="File ID" value={deleteId} onChange={e => setDeleteId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
