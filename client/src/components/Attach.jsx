import React from "react";
import { HiDocumentText } from "react-icons/hi2";
import { IoMdPhotos } from "react-icons/io";
const Attach = () => {
  return (
    <table className={`w-[15rem] bg-white`}>
      <tbody>
        <tr>
          <td className="pl-5">
            <HiDocumentText />
          </td>
          <td className="py-2">Document</td>
        </tr>
        <tr>
          <td className="pl-5">
            <IoMdPhotos />
          </td>
          <td className="py-2">Photos and videos</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Attach;
