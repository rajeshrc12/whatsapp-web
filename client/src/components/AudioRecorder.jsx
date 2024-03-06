import React, { useState, useEffect } from "react";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  useEffect(() => {
    // Check for MediaRecorder API availability
    if (!window.MediaRecorder) {
      throw new Error("MediaRecorder API is not available in this browser");
    }
  }, []);

  const startRecording = async () => {
    try {
      // Request permissions and capture media stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.onstart = () => {
        setRecording(true);
        chunks = [];
      };

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      setMediaRecorder(recorder);
      recorder.start();
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center space-x-4">
        {!recording && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startRecording}
          >
            Start Recording
          </button>
        )}
        {recording && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        )}
      </div>
      {audioURL && (
        <div className="mt-4">
          <audio className="w-full" controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
