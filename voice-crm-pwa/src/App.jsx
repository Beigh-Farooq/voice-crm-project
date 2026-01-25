import { useState } from "react";
import VoiceRecorder from "./Components/VoiceRecorder";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Voice CRM Assistant</h2>

      <VoiceRecorder onResult={setResult} />

      {result && (
        <>
          <h3>📝 Transcription</h3>
          <p>{result.transcription}</p>

          <h3>📦 Structured JSON</h3>
          <pre style={{ background: "#f4f4f4", padding: 16 }}>
            {JSON.stringify(result.structured_output, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;
