import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EvalDashboard() {
  const [evals, setEvals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/evals/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch evals");
        return res.json();
      })
      .then((data) => {
        setEvals(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Backend not reachable");
        setLoading(false);
      });
  }, []);

  const downloadCSV = () => {
    window.open("http://127.0.0.1:8000/api/evals/export/", "_blank");
  };

  return (
    <div style={{ marginTop: 40 }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#2563eb",
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        ← Back
      </button>

      {/* Header with button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Dashboard</h3>

        <button
          onClick={downloadCSV}
          style={{
            backgroundColor: "#16a34a",
            color: "#ffffff",
            padding: "8px 14px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Download CSV
        </button>
      </div>

      {loading && <p>Loading evals...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table
          border="1"
          width="100%"
          cellPadding="8"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Transcription</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {evals.length === 0 && (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No evals yet
                </td>
              </tr>
            )}

            {evals.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.transcription}</td>
                <td>{new Date(e.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
