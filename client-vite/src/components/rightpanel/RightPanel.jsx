import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "../../icons/CancelIcon";
import data from "../../data/data";
import EditIcon from "../../icons/EditIcon";
import InputBottomBorder from "../input/InputBottomBorder";
import CheckmarkIcon from "../../icons/CheckmarkIcon";
import CameraIconUpload from "../../icons/CameraIconUpload";
import RightArrowIcon from "../../icons/RightArrowIcon";
import iconColors from "../../icons/colors";
import { right } from "../../state/panel/panelSlice";
import BackIcon from "../../icons/BackIcon";
import MediaPreviewTabs from "../mediapreview/MediaPreviewTabs";

const RightPanel = () => {
  const rightValue = useSelector((state) => state.panel.right);
  const [editGroupName, setEditGroupName] = useState("");
  console.log(rightValue);
  const renderCarouselList = (chat) => {
    switch (chat.type) {
      case "image":
        return (
          <div
            style={{
              flexBasis: "100px",
              flexGrow: "0",
              flexShrink: "0",
              backgroundImage: `url(${chat.message})`,
              backgroundSize: "contain",
            }}
            className={`h-24 rounded-lg border-[7px] border-[#d1d7db] transition`}
          ></div>
        );
      case "video":
        return (
          <div
            style={{
              flexBasis: "80px",
              flexGrow: "0",
              flexShrink: "0",
            }}
            className={`h-24 rounded-lg border-[7px] border-[#d1d7db] transition`}
          >
            <video className="h-full w-full" src={chat.message}></video>
          </div>
        );
      default:
        return <>Unknown</>;
    }
  };

  const dispatch = useDispatch();
  const render = useCallback(() => {
    switch (rightValue) {
      case "userProfile":
        return (
          <div className="w-[30%] bg-panel-header-background">
            <div className="flex flex-col h-full">
              <div className="h-[10%] bg-panel-header-background flex">
                <div className="">
                  <CancelIcon />
                </div>
                <div>Contct info</div>
              </div>
              <div className="h-[90%] overflow-y-scroll flex flex-col gap-2">
                <div className="bg-white flex flex-col justify-center items-center p-2">
                  <div className="w-52 h-52 flex flex-col justify-center items-center rounded-full bg-photopicker-overlay-background">
                    <CameraIconUpload />
                    <div className="text-xs font-thin text-white">
                      ADD GROUP ICON
                    </div>
                  </div>
                  <div className="flex justify-center items-center p-3 gap-2">
                    <div className="font-medium text-lg">
                      {editGroupName ? <InputBottomBorder /> : "Group name"}
                    </div>
                    <div>
                      {editGroupName ? (
                        <CheckmarkIcon
                          onClick={() => {
                            setEditGroupName("");
                          }}
                        />
                      ) : (
                        <EditIcon
                          onClick={() => {
                            console.log("hii");
                            setEditGroupName("Group name");
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex justify-between">
                    <div>Media Link</div>
                    <div className="flex justify-center items-center">
                      <div>{data.chats.length}</div>
                      <div>
                        <RightArrowIcon
                          color={iconColors.panelHeaderIcon}
                          onClick={() => dispatch(right("mediaPreview"))}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    {data.images
                      .filter((img, i) => i < 3)
                      .map((file, i) => renderCarouselList(file, i))}
                  </div>
                </div>
                <div className="bg-white flex justify-between p-4">
                  <div>Group Permission</div>
                  <div>
                    <RightArrowIcon
                      color={iconColors.panelHeaderIcon}
                      onClick={() => dispatch(right("groupSettings"))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "mediaPreview":
        return (
          <div className="w-[30%] bg-panel-header-background">
            <div className="h-[10%] bg-panel-background-colored flex">
              <div className="flex items-center px-5">
                <BackIcon color="#fff" />
              </div>
            </div>
            <div className="h-[90%]">
              <MediaPreviewTabs />
            </div>
          </div>
        );
      default:
        return <></>;
    }
  }, [rightValue, editGroupName]);
  return render();
};

export default RightPanel;
