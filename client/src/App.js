import React, { useState } from "react";
import axios from "axios";

const MediaDisplay = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      const response1 = await axios.get(
        `http://localhost:3001/images/${1713518611762}`,
        {
          responseType: "arraybuffer",
        }
      );
      const imageData = Buffer.from(response1.data, "binary").toString(
        "base64"
      );
      setImageUrl(`data:image/jpeg;base64,${imageData}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:3001/upload/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setVideoUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button onClick={handleImageUpload}>Upload Image</button>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded Image"
          style={{ maxWidth: "100%", maxHeight: "300px" }}
        />
      )}

      <h2>Upload Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <button onClick={handleVideoUpload}>Upload Video</button>
      {videoUrl && (
        <video controls style={{ maxWidth: "100%" }}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default MediaDisplay;
