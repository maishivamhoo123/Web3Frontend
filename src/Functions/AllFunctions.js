import { ethers } from "ethers";
import { contractABI } from "../DriveABI.js";

const ContractAddress = "0x3aaca375aeca52c277b575040a816aafd0b93484";

let contract;

// Get contract instance
export const getContract = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum); // Ethers v6
  const signer = await provider.getSigner();
  contract = new ethers.Contract(ContractAddress, contractABI, signer);
  return contract;
};

// Connect wallet
export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};

// Upload file
export const addFile = async (path, title) => {
  const c = await getContract();
  const tx = await c.addFile(path, title);
  await tx.wait();
};

// Share file
export const shareFile = async (id, user) => {
  const c = await getContract();
  const tx = await c.sharingFile(parseInt(id), user);
  await tx.wait();
};

// Delete file
export const deleteFile = async (id) => {
  const c = await getContract();
  const tx = await c.deleteFile(parseInt(id));
  await tx.wait();
};

// Load all accessible files
export const loadFiles = async () => {
  const c = await getContract();
  const ids = await c.listingFile();
  const files = [];
  for (let id of ids) {
    const [path, title, owner, deleted] = await c.getFiles(id);
    if (!deleted) files.push({ id: id.toString(), path, title, owner });
  }
  return files;
};
