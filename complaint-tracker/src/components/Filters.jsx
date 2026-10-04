import { STATUSES } from "../reducer";

export default function Filters({ search, setSearch, status, setStatus }) {
  return (
    <div className="card row filters">
      <input placeholder="Search complaints…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="All">All statuses</option>
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
    </div>
  );
}
