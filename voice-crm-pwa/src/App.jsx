import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import VoiceRecorder from "./Components/VoiceRecorder";
import EvalDashboard from "./Components/EvalDashboard";

function Home() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>CRM ASSIST</h2>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </button>
      </div>

      <div style={{ marginTop: 100 }}>
        <VoiceRecorder onResult={setResult} />
      </div>

      {result && (
        <>
          <h3>Transcription</h3>
          <p>{result.transcription}</p>

          <h3>Structured JSON</h3>
          <pre style={{ background: "#f4f4f4", padding: 16 }}>
            {JSON.stringify(result.structured_output, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<EvalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
