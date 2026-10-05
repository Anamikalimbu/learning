import { useState } from "react";
import { CATEGORIES, STATUSES } from "../reducer";

export default function ComplaintItem({ complaint, onStatusChange, onEdit, onDelete }) {
  const { id, title, category, ward, description, status, createdAt } = complaint;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({ title, category, ward, description });
  const [error, setError] = useState("");

  const startEdit = () => {
    setDraft({ title, category, ward, description });
    setError("");
    setIsEditing(true);
  };

  const handleChange = (e) => setDraft({ ...draft, [e.target.name]: e.target.value });

  const saveEdit = () => {
    if (draft.title.trim().length < 5) return setError("Title must be at least 5 characters.");
    if (!draft.ward.trim()) return setError("Please enter your ward number.");
    onEdit(id, { ...draft, title: draft.title.trim(), ward: draft.ward.trim() });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="card item">
        <input name="title" value={draft.title} onChange={handleChange} aria-label="Title" />
        <div className="row">
          <select name="category" value={draft.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input name="ward" value={draft.ward} onChange={handleChange} aria-label="Ward" />
        </div>
        <textarea name="description" rows="3" value={draft.description} onChange={handleChange} aria-label="Description" />
        {error && <p className="error" role="alert">{error}</p>}
        <div className="edit-actions">
          <button onClick={saveEdit}>Save changes</button>
          <button className="secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </li>
    );
  }

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
        <button className="secondary" onClick={startEdit}>Edit</button>
        <button className="danger" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
}
