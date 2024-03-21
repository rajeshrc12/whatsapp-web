import React, { useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import data from "../../data/data";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import RightArrowIcon from "../../icons/RightArrowIcon";
import { useDispatch } from "react-redux";
import { main } from "../../state/panel/panelSlice";

const MediaPreview = () => {
  const [files, setFiles] = useState([...data.images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();

  return (
    <div className="fixed p-3 bg-white top-0 left-0 h-screen w-screen flex flex-col justify-between">
      <div className="h-[10%]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={data.loggedInUser.url} />
              </div>
            </div>
            <div className="text-sm">
              <div>
                <button>Rajesh</button>
              </div>
              <div>Last seen</div>
            </div>
          </div>
          <div>
            <CancelIcon onClick={() => dispatch(main(""))} />
          </div>
        </div>
      </div>
      <div className="h-[80%]">
        <div className="flex justify-between items-center h-full">
          <div className="bg-chevron-button-background p-2 rounded-full">
            <LeftArrowIcon
              onClick={() => {
                setSelectedIndex(
                  selectedIndex - 1 < 0 ? dispatch(main("")) : selectedIndex - 1
                );
              }}
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${files[selectedIndex]})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="w-full h-full flex justify-center items-center"
          ></div>
          <div className="bg-chevron-button-background p-2 rounded-full">
            <RightArrowIcon
              onClick={() => {
                setSelectedIndex(
                  selectedIndex + 1 < files.length
                    ? selectedIndex + 1
                    : dispatch(main(""))
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[20%]">
        <div
          className={`overflow-x-scroll flex gap-3 p-2 ${
            files.length < 15 && "justify-center"
          }`}
        >
          {files.map((file, i) => (
            <div
              style={{
                flexBasis: "80px",
                flexGrow: "0",
                flexShrink: "0",
                backgroundImage: `url(${file})`,
                backgroundSize: "contain",
              }}
              className={`h-20 rounded-lg ${
                i === selectedIndex ? "scale-75 border-[10px]" : "border-[3px]"
              } border-[#d1d7db] ${file === "" && "invisible"} transition`}
              onClick={() => {
                setSelectedIndex(i);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;
