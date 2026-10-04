import { STATUSES } from "../reducer";

export default function Stats({ complaints }) {
  return (
    <div className="stats">
      <div className="card"><strong>{complaints.length}</strong><span>Total</span></div>
      {STATUSES.map((s) => (
        <div className="card" key={s}>
          <strong>{complaints.filter((c) => c.status === s).length}</strong>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}
