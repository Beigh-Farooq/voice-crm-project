import { useEffect, useState } from "react";

export default function EvalDashboard() {
  const [evals, setEvals] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/evals/")
      .then(res => res.json())
      .then(setEvals);
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <h3>📊 Evaluation Dashboard</h3>

      <table border="1" width="100%" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Transcription</th>
            <th>Verified</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {evals.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.transcription}</td>
              <td>{e.verified ? "✅" : "❌"}</td>
              <td>{new Date(e.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
