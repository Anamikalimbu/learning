import { useState } from "react";
import { CATEGORIES } from "../reducer";

const empty = { title: "", category: CATEGORIES[0], ward: "", description: "" };

export default function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.trim().length < 5) {
      setError("Title must be at least 5 characters.");
      return;
    }
    if (!form.ward.trim()) {
      setError("Please enter your ward number.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), ward: form.ward.trim() });
    setForm(empty);
    setError("");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>File a complaint</h2>
      <input name="title" placeholder="Title (e.g. Broken streetlight)" value={form.title} onChange={handleChange} />
      <div className="row">
        <select name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input name="ward" placeholder="Ward no." value={form.ward} onChange={handleChange} />
      </div>
      <textarea name="description" rows="3" placeholder="Describe the problem" value={form.description} onChange={handleChange} />
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit">Submit complaint</button>
    </form>
  );
}
