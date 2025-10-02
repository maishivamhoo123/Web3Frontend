import React, { useState, useEffect } from "react";
import { connectWallet, loadFiles } from "./Functions/AllFunctions";
import UploadFile from "./Sections/UploadFile";
import ShareFile from "./Sections/ShareFile";
import DeleteFile from "./Sections/DeleteFile";
import FileList from "./Sections/FileList";
import Navbar from "./Sections/NavBar";
import UploadFileToPinata from "./Sections/UdloadFileToPinata";
import "./App.css"; // import the styles

function App() {
  const [files, setFiles] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");

  // Auto-connect wallet on load
  useEffect(() => {
    const init = async () => {
      const account = await connectWallet();
      if (account) setCurrentAccount(account);
    };
    init();
  }, []);

  // Reload files from blockchain
  const reloadFiles = async () => {
    const loaded = await loadFiles();
    setFiles(loaded);
  };

  // Handle manual connect
  const handleConnectWallet = async () => {
    const account = await connectWallet();
    if (account) setCurrentAccount(account);
  };

  return (
    <div className="app-container">
      <Navbar currentAccount={currentAccount} />

      {/* Upload Section */}
      <div className="upload-section">
        <UploadFile onFileAdded={reloadFiles} />
        <UploadFileToPinata onFileAdded={reloadFiles} />
      </div>

      <hr />

      {/* File List */}
      <FileList files={files} reloadFiles={reloadFiles} />
    </div>
  );
}

export default App;
