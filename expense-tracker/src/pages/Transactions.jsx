import { useMemo, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useExpenses } from "../context/ExpenseContext";
import { CATEGORIES } from "../utils/constants";

const allCategories = [...new Set([...CATEGORIES.expense, ...CATEGORIES.income])];

export default function Transactions() {
  const { items, add, update, remove } = useExpenses();
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () =>
      items.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (type === "all" || t.type === type) &&
          (category === "all" || t.category === category)
      ),
    [items, search, type, category]
  );

  const handleSubmit = (t) => {
    editing ? update(t) : add(t);
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) remove(id);
  };

  return (
    <div className="split">
      <TransactionForm editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
      <section className="card">
        <h2>All transactions</h2>
        <div className="filters">
          <input placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All types</option>
            <option value="expense">Expenses</option>
            <option value="income">Income</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {allCategories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <TransactionList items={filtered} onEdit={setEditing} onDelete={handleDelete} />
      </section>
    </div>
  );
}
