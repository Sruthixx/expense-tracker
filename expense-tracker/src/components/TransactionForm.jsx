import { useEffect, useState } from "react";
import { CATEGORIES } from "../utils/constants";

const today = () => new Date().toISOString().slice(0, 10);
const blank = { type: "expense", title: "", amount: "", category: "Food", date: today() };

export default function TransactionForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  // Fill the form when a transaction is chosen for editing
  useEffect(() => {
    setForm(editing ? { ...editing, amount: String(editing.amount) } : blank);
    setErrors({});
  }, [editing]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => {
      const next = { ...f, [name]: value };
      if (name === "type") next.category = CATEGORIES[value][0];
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 3) e.title = "Enter a title of at least 3 characters.";
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Enter an amount greater than 0.";
    if (!form.date) e.date = "Pick a date.";
    else if (form.date > today()) e.date = "Date cannot be in the future.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, title: form.title.trim(), amount: Number(form.amount) });
    if (!editing) setForm(blank);
  };

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h2>{editing ? "Edit transaction" : "Add transaction"}</h2>

      <div className="toggle">
        {["expense", "income"].map((t) => (
          <label key={t} className={form.type === t ? `on ${t}` : ""}>
            <input type="radio" name="type" value={t} checked={form.type === t} onChange={change} />
            {t === "expense" ? "Expense" : "Income"}
          </label>
        ))}
      </div>

      <label>Title
        <input name="title" value={form.title} onChange={change} placeholder="e.g. Grocery run" />
        {errors.title && <small>{errors.title}</small>}
      </label>

      <div className="row">
        <label>Amount (₹)
          <input name="amount" type="number" min="0" value={form.amount} onChange={change} placeholder="0" />
          {errors.amount && <small>{errors.amount}</small>}
        </label>
        <label>Date
          <input name="date" type="date" max={today()} value={form.date} onChange={change} />
          {errors.date && <small>{errors.date}</small>}
        </label>
      </div>

      <label>Category
        <select name="category" value={form.category} onChange={change}>
          {CATEGORIES[form.type].map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>

      <div className="actions">
        <button className="btn primary" type="submit">{editing ? "Save changes" : "Add transaction"}</button>
        {editing && <button className="btn ghost" type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
