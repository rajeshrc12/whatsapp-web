import React, { useState } from "react";
import { useSelector } from "react-redux";
import CancelIcon from "../../icons/CancelIcon";
import SendIcon from "../../icons/SendIcon";

const PreviewFiles = () => {
  const files = useSelector((state) => state.files.blobFiles);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  return (
    <div className="grid grid-rows-12">
      <div className="row-span-1">
        <div className="flex p-4 bg-panel-background-deeper justify-between">
          <div>
            <CancelIcon />
          </div>
          <div className="text-sm">name</div>
          <div></div>
        </div>
      </div>
      <div className="row-span-8 border"></div>
      <div className="row-span-1 border"></div>
      <div className="row-span-2 border"></div>
    </div>
  );
};

export default PreviewFiles;
