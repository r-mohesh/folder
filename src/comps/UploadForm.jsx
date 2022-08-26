import React from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);

  const types = ["image/png", "image/jpeg", "image/gif"];

  const setFileInfo = (file) => {
    console.log("set file info called", file);

    //refrence
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log(percentage);
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        console.log("get url");
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  };

  const changeUploadForm = (e) => {
    let selected = e.target.files[0];
    console.log("changed", selected, e);
    console.log(selected && types.includes(selected.type));
    if (selected && types.includes(selected.type)) {
      setFileInfo(selected);
      setFile(selected);
      //   setError("");
    } else {
      //   setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };
  return (
    <form>
      <label>
        <input type="file" onChange={changeUploadForm} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="file">{file.name}</div>}
        {file && progress < 100 && <ProgressBar percentage={progress} />}
      </div>
    </form>
  );
};

export default UploadForm;
