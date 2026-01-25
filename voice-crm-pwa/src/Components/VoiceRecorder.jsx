import { useRef, useState } from "react";

export default function VoiceRecorder({ onResult }) {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await sendToBackend(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch {
      setError("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const sendToBackend = async (audioBlob) => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/voice-to-json/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onResult(data);
    } catch {
      setError("Backend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h3>🎙 Voice Input</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {loading && <p>Processing...</p>}
    </div>
  );
}
