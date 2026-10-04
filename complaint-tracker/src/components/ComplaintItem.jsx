import { STATUSES } from "../reducer";

export default function ComplaintItem({ complaint, onStatusChange, onDelete }) {
  const { id, title, category, ward, description, status, createdAt } = complaint;

  return (
    <li className="card item">
      <div className="item-head">
        <h3>{title}</h3>
        <span className={`badge ${status.replace(" ", "-").toLowerCase()}`}>{status}</span>
      </div>
      <p className="meta">
        {category} · Ward {ward} · {new Date(createdAt).toLocaleDateString()}
      </p>
      {description && <p>{description}</p>}
      <div className="row">
        <select value={status} onChange={(e) => onStatusChange(id, e.target.value)} aria-label="Change status">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
}
