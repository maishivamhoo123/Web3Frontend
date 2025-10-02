import React, { useState } from "react";
import { shareFile } from "../Functions/AllFunctions";

export default function ShareFile() {
  const [shareId, setShareId] = useState("");
  const [shareAddr, setShareAddr] = useState("");

  const handleShare = async () => {
    if (!shareId || !shareAddr) return alert("Enter file ID & address");
    await shareFile(shareId, shareAddr);
    alert("File shared!");
    setShareId(""); setShareAddr("");
  };

  return (
    <div>
      <h2>Upload by CID</h2>
      <input placeholder="File ID" value={shareId} onChange={e => setShareId(e.target.value)} />
      <input placeholder="User address" value={shareAddr} onChange={e => setShareAddr(e.target.value)} />
      <button onClick={handleShare}>Share</button>
    </div>
  );
}
