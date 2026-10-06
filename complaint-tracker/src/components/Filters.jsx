import { STATUSES } from "../reducer";

export default function Filters({ search, setSearch, status, setStatus, sort, setSort }) {
  return (
    <div className="card row filters">
      <input placeholder="Search complaints…" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
        <option value="All">All statuses</option>
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort complaints">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="priority">Highest priority</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  );
}
