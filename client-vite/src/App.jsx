import React, { useState } from "react";
import data from "./data/data";
import StatusIcon from "./icons/Status";
import Menu from "./icons/Menu";
import Search from "./icons/Search";
import Filter from "./icons/Filter";
import InputFileIcon from "./components/input/InputFileIcon";
import DocumentIcon from "./icons/DocumentIcon";
import PlusIcon from "./icons/PlusIcon";
import CamerIcon from "./icons/CamerIcon";
import ContactIcon from "./icons/ContactIcon";
import PollIcon from "./icons/PollIcon";
import MicIcon from "./icons/MicIcon";
import PhotosAndVideosIcon from "./icons/PhotosAndVideosIcon";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "./icons/CancelIcon";
import SendIcon from "./icons/SendIcon";
import { deleteFileByIndex } from "./state/files/filesSlice";
import { FaFile } from "react-icons/fa6";
const App = () => {
  const files = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const [rightPanel, setRightPanel] = useState(false);
  const [document, setDocument] = useState(true);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  console.log(selectedFileIndex);
  const handlePreviewFiles = () => {
    setDocument(true);
  };
  return (
    <div className="grid grid-cols-12 h-screen w-screen">
      {/* Left Panel */}
      <div className="col-span-3 border-r-[2px]">
        <div className="grid grid-rows-12 h-full">
          {/* Top icons */}
          <div className="row-span-1">
            <div className="px-5 h-full flex justify-between items-center bg-panel-header-background">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={data.loggedInUser.url} />
                </div>
              </div>
              <div className="flex gap-3">
                <StatusIcon />
                <Menu />
              </div>
            </div>
          </div>
          {/* Contact search and filter */}
          <div className="row-span-1">
            <div className="flex h-full px-1 gap-2 justify-between items-center">
              <div className="flex rounded-lg p-1 w-full bg-panel-header-background">
                <div className="px-5">
                  <Search />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search or start new chat"
                    className="outline-none bg-panel-header-background w-full"
                  />
                </div>
              </div>
              <div>
                <Filter />
              </div>
            </div>
          </div>
          {/* Contact list */}
          <div className="row-span-10 relative overflow-y-scroll">
            <div className="absolute top-0 left-0 h-full p-2">
              {new Array(30).fill(0).map((d) => (
                <div>hello</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Middle Panel */}
      <div className={`col-span-${rightPanel ? 6 : 9} border-r-[2px]`}>
        <div className="grid grid-rows-12 h-full">
          {/* Profile name and image */}
          <div className="row-span-1">
            <div className="flex h-full px-5 justify-between items-center bg-panel-header-background">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={data.loggedInUser.url} />
                  </div>
                </div>
                <div className="text-sm">
                  <div>
                    <button onClick={() => setRightPanel(!rightPanel)}>
                      Rajesh
                    </button>
                  </div>
                  <div>Last seen</div>
                </div>
              </div>
              <div className="flex gap-5">
                <Search />
                <Menu />
              </div>
            </div>
          </div>
          {/* Chat and document view window */}
          {document ? (
            <>
              <div className="row-span-11">
                <div className="grid grid-rows-12 h-full bg-panel-header-background">
                  <div className="row-span-1">
                    <div className="flex h-full bg-panel-background-deeper justify-between items-center">
                      <div className="pl-5">
                        <CancelIcon />
                      </div>
                      <div className="text-sm">
                        {files?.blobFiles[selectedFileIndex]?.name}
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="row-span-8 flex justify-center items-center">
                    <div
                      style={{
                        backgroundImage: `url(${
                          files?.blobFiles[selectedFileIndex]?.type.includes(
                            "image"
                          )
                            ? URL.createObjectURL(
                                files.blobFiles[selectedFileIndex]
                              )
                            : ""
                        })`,
                        backgroundSize: "contain",
                      }}
                      className="h-3/4 w-1/3 flex justify-center items-center"
                    >
                      <div>
                        {" "}
                        {!files?.blobFiles[selectedFileIndex]?.type.includes(
                          "image"
                        ) && "No preview available"}
                      </div>
                    </div>
                  </div>
                  <div className="row-span-1">
                    <div className="flex justify-center items-center h-full">
                      <input
                        placeholder="Type a message"
                        type="text"
                        className="w-2/3 outline-none p-2 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="row-span-3">
                    <div className="grid grid-cols-12 h-full">
                      <div className="col-span-11 relative overflow-x-scroll">
                        <div className="absolute flex top-0 left-0 h-full w-full">
                          <div
                            style={{
                              display: "grid",
                              gridAutoColumns: "1fr",
                              gridAutoFlow: "column",
                              gap: "1rem",
                              padding: "0.5rem",
                              alignItems: "center",
                            }}
                          >
                            {files.blobFiles.map((file, index) => (
                              <div
                                style={{
                                  backgroundImage: `url(${
                                    file.type.includes("image")
                                      ? URL.createObjectURL(file)
                                      : ""
                                  })`,
                                  backgroundSize: "contain",
                                }}
                                className={`flex justify-center items-center cursor-pointer w-[4vw] h-5/6 border-2 border-[${
                                  index === selectedFileIndex
                                    ? "#00a884"
                                    : "#d1d7db"
                                }] rounded-lg relative`}
                                onClick={() => setSelectedFileIndex(index)}
                              >
                                {!file.type.includes("image") && (
                                  <FaFile color="gray" size={30} />
                                )}

                                <div
                                  onClick={() => {
                                    dispatch(deleteFileByIndex(index));
                                  }}
                                  className="opacity-0 hover:opacity-100 absolute top-0 right-0 cursor-pointer"
                                >
                                  <CancelIcon />
                                </div>
                              </div>
                            ))}
                            <div className="sticky bg-panel-header-background top-0 right-0 w-[4vw] h-5/6 ">
                              <div className="border-2 border-[#d1d7db] rounded-lg  w-[4vw] h-full flex justify-center items-center">
                                <InputFileIcon icon={<PlusIcon />} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-center items-center">
                        <div className="inline-block bg-[#00a884] p-5 rounded-full">
                          <SendIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Chat window */}
              <div className="row-span-10 relative overflow-y-scroll">
                <div className="absolute p-2 top-0 left-0 h-full">
                  {new Array(30).fill(0).map((d) => (
                    <div>hello</div>
                  ))}
                </div>
              </div>
              {/* Send message and media */}
              <div className="row-span-1">
                <div className="flex h-full justify-between items-center px-3 gap-5 bg-panel-header-background">
                  <div className="dropdown dropdown-top">
                    <div tabIndex={0}>
                      <PlusIcon />
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content bg-white w-48 mb-3 flex z-[1] menu shadow rounded-lg"
                    >
                      <InputFileIcon
                        icon={
                          <div className="flex gap-3 p-2 hover:bg-gray-100">
                            <div>
                              <DocumentIcon />
                            </div>
                            <div>Document</div>
                          </div>
                        }
                        multiple={true}
                        callback={handlePreviewFiles}
                      />
                      <InputFileIcon
                        icon={
                          <div className="flex gap-3 p-2 hover:bg-gray-100">
                            <div>
                              <PhotosAndVideosIcon />
                            </div>
                            <div>Photos & Videos</div>
                          </div>
                        }
                        multiple={true}
                        callback={handlePreviewFiles}
                      />
                      <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                        <div>
                          <CamerIcon />
                        </div>
                        <div>Camera</div>
                      </div>
                      <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                        <div>
                          <ContactIcon />
                        </div>
                        <div>Contact</div>
                      </div>
                      <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                        <div>
                          <PollIcon />
                        </div>
                        <div>Poll</div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="outline-none p-1 rounded-lg w-full"
                  />
                  <MicIcon />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Right Panel */}
      {rightPanel && (
        <div className="col-span-3">
          <div className="grid grid-rows-12 h-full">
            <div className="row-span-1">1</div>
            <div className="row-span-11 relative overflow-y-scroll">
              <div className="absolute top-0 left-0 h-full">
                {new Array(30).fill(0).map((d) => (
                  <div>hello</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
