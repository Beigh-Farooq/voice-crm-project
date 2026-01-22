import { useState } from "react";
import VoiceRecorder from "./Components/VoiceRecorder";

function App() {
  const [audioBlob, setAudioBlob] = useState(null);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h2>Voice-based CRM Logger</h2>

      <VoiceRecorder onRecordingComplete={setAudioBlob} />

      {audioBlob && (
        <div>
          <h4>Recorded Audio Preview</h4>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )}
    </div>
  );
}

export default App;
