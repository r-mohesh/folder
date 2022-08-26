import React from "react";
import { motion } from "framer-motion";

const ProgressBar = React.memo(({ percentage }) => {
  console.log("progress bar called");
  //   const { progress, setFileInfo } = useStorage(file);
  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: percentage + "%" }}
    >
      {`uploading..: ${percentage}%`}
    </motion.div>
  );
});

export default ProgressBar;
