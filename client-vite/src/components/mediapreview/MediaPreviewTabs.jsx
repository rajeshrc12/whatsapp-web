import React, { useCallback, useEffect, useMemo, useState } from "react";
import data from "../../data/data";
import { FaFile } from "react-icons/fa6";
import DownloadIcon from "../../icons/DownloadIcon";
import TickIcon from "../../icons/TickIcon";
import { IoMdCheckmark } from "react-icons/io";
import BackIcon from "../../icons/BackIcon";
import CancelIcon from "../../icons/CancelIcon";
import StartIcon from "../../icons/StartIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import ForwardIcon from "../../icons/ForwardIcon";

const MediaPreviewTabs = ({}) => {
  const files = data.images;
  const docs = [
    { id: "id_121", name: "Test", format: "PDF", size: "10KB" },
    { id: "id_122", name: "Study", format: "PDF", size: "10KB" },
  ];
  const links = [
    { id: "id_121", link: "https://google.com" },
    { id: "id_122", link: "https://amazon.com" },
  ];
  const [activeTab, setActiveTab] = useState("Media");
  const [selectedMedia, setSelectedMedia] = useState({
    files: {},
    docs: {},
    links: {},
  });
  useEffect(() => {
    const selectedMediaTemp = {
      files: {},
      docs: {},
      links: {},
    };
    for (const file of files) {
      selectedMediaTemp.files[file.id] = false;
    }
    for (const doc of docs) {
      selectedMediaTemp.docs[doc.id] = false;
    }
    for (const link of links) {
      selectedMediaTemp.links[link.id] = false;
    }
    setSelectedMedia(selectedMediaTemp);
  }, []);
  console.log(selectedMedia);
  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "Docs":
        return (
          <div className="flex flex-col gap-5 text-sm">
            {docs.map((doc) => (
              <div className="flex items-center gap-3 hover:bg-gray-200 p-5">
                <div>
                  <div
                    onClick={() => {
                      console.log(selectedMedia);
                      setSelectedMedia({
                        ...selectedMedia,
                        docs: {
                          ...selectedMedia.docs,
                          [doc.id]: !selectedMedia.docs[doc.id],
                        },
                      });
                    }}
                    className={`${
                      selectedMedia.docs[doc.id]
                        ? "border-[2px] border-panel-background-colored bg-panel-background-colored"
                        : "border-[2px] border-gray-500"
                    } cursor-pointer rounded-md`}
                  >
                    <IoMdCheckmark
                      size={17}
                      color="#ffffff"
                      className={
                        selectedMedia.docs[doc.id] ? "visible" : "invisible"
                      }
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col bg-outgoing-background rounded-lg shadow-sm">
                  <div className="flex gap-2 justify-between items-center w-full bg-popup-panel-background  rounded-lg">
                    <div className="p-3">
                      <FaFile color="gray" size={30} />
                    </div>
                    <div className="w-full justify-center h-[10vh] flex flex-col">
                      <div>{doc.name}</div>
                      <div className="text-[11px]">{doc.format}</div>
                    </div>
                    <div className="p-3">
                      <DownloadIcon />
                    </div>
                  </div>
                  <div className="px-2 flex flex-col justify-between">
                    <div>Lorem ipsum,</div>
                    <div className="flex justify-end items-center">
                      <div className="text-gray-400 text-xs">22/03/2023</div>
                      <div>
                        <TickIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "Links":
        return (
          <div className="flex flex-col gap-5 text-sm">
            {links.map((link) => (
              <div className="flex items-center gap-3 hover:bg-gray-200 p-5">
                <div>
                  <div
                    onClick={() => {
                      console.log(selectedMedia);
                      setSelectedMedia({
                        ...selectedMedia,
                        links: {
                          ...selectedMedia.links,
                          [link.id]: !selectedMedia.links[link.id],
                        },
                      });
                    }}
                    className={`${
                      selectedMedia.links[link.id]
                        ? "border-[2px] border-panel-background-colored bg-panel-background-colored"
                        : "border-[2px] border-gray-500"
                    } cursor-pointer rounded-md`}
                  >
                    <IoMdCheckmark
                      size={17}
                      color="#ffffff"
                      className={
                        selectedMedia.links[link.id] ? "visible" : "invisible"
                      }
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col bg-outgoing-background rounded-lg shadow-sm">
                  <div className="p-3 flex gap-2 justify-between items-center w-full bg-popup-panel-background  rounded-lg">
                    <a target="_blank" href={link.link}>
                      {link.link}
                    </a>
                  </div>
                  <div className="px-2 flex flex-col justify-between">
                    <div className="flex justify-end items-center">
                      <div className="text-gray-400 text-xs">22/03/2023</div>
                      <div>
                        <TickIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex flex-wrap gap-2 p-2">
            {files.map((file, i) => {
              return (
                <div
                  onClick={() => {
                    setSelectedMedia({
                      ...selectedMedia,
                      files: {
                        ...selectedMedia.files,
                        [file.id]: !selectedMedia.files[file.id],
                      },
                    });
                  }}
                  style={{
                    flexBasis: "120px",
                    flexGrow: "0",
                    flexShrink: "0",
                    backgroundImage: `url(${file.message})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className={`h-28 relative rounded-lg border-[7px] border-[#d1d7db] transition`}
                >
                  {selectedMedia.files[file.id] ? (
                    <div
                      className={`absolute top-0 left-0 bg-poll-bar-fill-sender rounded-full p-[1px]`}
                    >
                      <IoMdCheckmark size={15} color="#ffffff" />
                    </div>
                  ) : (
                    <div
                      className={`absolute top-0 left-0 bg-white rounded-full p-[1px]`}
                    >
                      <IoMdCheckmark size={15} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
    }
  }, [activeTab, selectedMedia]);
  const canForwardMessage = useMemo(() => {
    console.clear();
    let len = 0;
    for (const media in selectedMedia) {
      for (const id in selectedMedia[media]) {
        if (selectedMedia[media][id]) len++;
      }
    }
    return len;
  }, [selectedMedia]);
  return (
    <div className="w-[30%] bg-panel-header-background">
      <div className="h-[10%] bg-panel-background-colored flex">
        <div className="flex justify-between items-center px-5 w-full">
          <div className="flex gap-5">
            <div>
              {canForwardMessage ? (
                <CancelIcon color="#fff" />
              ) : (
                <BackIcon color="#fff" />
              )}
            </div>
            {!!canForwardMessage && (
              <div className="text-white">{canForwardMessage} selected</div>
            )}
          </div>
          {!!canForwardMessage && (
            <div className="flex gap-5">
              <div>
                <StartIcon />
              </div>
              <div>
                <DeleteIcon />
              </div>
              <div>
                <ForwardIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[90%]">
        <div className="h-full w-full">
          <div className="h-[10%]">
            <div className="flex text-sm h-full">
              {["Media", "Docs", "Links"].map((tab) => (
                <div
                  onClick={() => setActiveTab(tab)}
                  key={tab}
                  style={{ flexGrow: 1, flexBasis: 0 }}
                  className={`flex items-center justify-center cursor-pointer ${
                    activeTab === tab
                      ? "border-b-[4px] border-panel-background-colored text-panel-background-colored"
                      : "border-b-[1px] text-poll-checkbox-default-border-color-sender"
                  }`}
                >
                  <div>{tab}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[90%] overflow-y-scroll">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MediaPreviewTabs;
