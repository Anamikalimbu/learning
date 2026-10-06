import { useMemo, useReducer, useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { complaintsReducer, PRIORITIES } from "./reducer";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintItem from "./components/ComplaintItem";
import Filters from "./components/Filters";
import Stats from "./components/Stats";

export default function App() {
  const [saved, setSaved] = useLocalStorage("complaints", []);
  const [complaints, dispatch] = useReducer(complaintsReducer, saved);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  // keep localStorage in sync with reducer state
  useEffect(() => setSaved(complaints), [complaints, setSaved]);

  const visible = useMemo(() => {
    const rank = (c) => PRIORITIES.indexOf(c.priority ?? "Medium");
    const sorters = {
      newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      priority: (a, b) => rank(b) - rank(a),
      title: (a, b) => a.title.localeCompare(b.title),
    };
    return complaints
      .filter(
        (c) =>
          (status === "All" || c.status === status) &&
          `${c.title} ${c.description} ${c.category}`.toLowerCase().includes(search.toLowerCase())
      )
      .sort(sorters[sort]);
  }, [complaints, search, status, sort]);

  return (
    <main className="container">
      <h1>Complaint Tracker</h1>
      <Stats complaints={complaints} />
      <ComplaintForm onSubmit={(payload) => dispatch({ type: "ADD", payload })} />
      <Filters search={search} setSearch={setSearch} status={status} setStatus={setStatus} sort={sort} setSort={setSort} />
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
