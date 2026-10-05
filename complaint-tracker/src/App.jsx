import { useMemo, useReducer, useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { complaintsReducer } from "./reducer";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintItem from "./components/ComplaintItem";
import Filters from "./components/Filters";
import Stats from "./components/Stats";

export default function App() {
  const [saved, setSaved] = useLocalStorage("complaints", []);
  const [complaints, dispatch] = useReducer(complaintsReducer, saved);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // keep localStorage in sync with reducer state
  useEffect(() => setSaved(complaints), [complaints, setSaved]);

  const visible = useMemo(
    () =>
      complaints.filter(
        (c) =>
          (status === "All" || c.status === status) &&
          `${c.title} ${c.description} ${c.category}`.toLowerCase().includes(search.toLowerCase())
      ),
    [complaints, search, status]
  );

  return (
    <main className="container">
      <h1>Complaint Tracker</h1>
      <Stats complaints={complaints} />
      <ComplaintForm onSubmit={(payload) => dispatch({ type: "ADD", payload })} />
      <Filters search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      {visible.length === 0 ? (
        <p className="empty">No complaints found. File one above to get started.</p>
      ) : (
        <ul className="list">
          {visible.map((c) => (
            <ComplaintItem
              key={c.id}
              complaint={c}
              onStatusChange={(id, s) => dispatch({ type: "UPDATE_STATUS", id, status: s })}
              onEdit={(id, changes) => dispatch({ type: "EDIT", id, changes })}
              onDelete={(id) => dispatch({ type: "DELETE", id })}
            />
          ))}
        </ul>
      )}
    </main>
  );
}