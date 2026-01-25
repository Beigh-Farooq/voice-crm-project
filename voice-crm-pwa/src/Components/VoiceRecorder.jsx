import { useEffect, useRef, useState } from "react";

export default function VoiceRecorder({ onResult }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [recording, paused]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      if (chunksRef.current.length === 0) return;

      setLoading(true);
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audio", audioBlob);

      const res = await fetch(
        "http://127.0.0.1:8000/api/voice-to-json/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      onResult(data);
      setLoading(false);
    };

    recorder.start();
    setRecording(true);
    setPaused(false);
    setSeconds(0);
  };

  const pauseRecording = () => {
    mediaRecorderRef.current.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorderRef.current.resume();
    setPaused(false);
  };

  const finishRecording = () => {
    clearInterval(timerRef.current);
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const discardRecording = () => {
    clearInterval(timerRef.current);
    chunksRef.current = [];
    setRecording(false);
    setPaused(false);
    setSeconds(0);
  };

  const formatTime = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `00:${m}:${s}s`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>{formatTime()}</h1>

      {!recording && (
        <button
          onClick={startRecording}
          style={{
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "14px 28px",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Start Recording
        </button>
      )}

      {recording && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={discardRecording}
            style={{
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Discard
          </button>

          <button
            onClick={paused ? resumeRecording : pauseRecording}
            style={{
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {paused ? "Resume" : "Pause"}
          </button>

          <button
            onClick={finishRecording}
            style={{
              backgroundColor: "#dc2626",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Finish
          </button>
        </div>
      )}

      {loading && <p>Processing...</p>}
    </div>
  );
}
