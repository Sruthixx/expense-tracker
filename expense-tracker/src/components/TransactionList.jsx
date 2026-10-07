import { formatDate, formatMoney } from "../utils/constants";

export default function TransactionList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <div className="empty">No transactions found. Add one to get started.</div>;
  }
  return (
    <ul className="list">
      {items.map((t) => (
        <li key={t.id} className="item">
          <div className={`dot ${t.type}`}>{t.category[0]}</div>
          <div className="info">
            <strong>{t.title}</strong>
            <span>{t.category} · {formatDate(t.date)}</span>
          </div>
          <b className={t.type}>{t.type === "income" ? "+" : "-"}{formatMoney(t.amount)}</b>
          {onEdit && (
            <div className="tools">
              <button onClick={() => onEdit(t)} aria-label={`Edit ${t.title}`}>Edit</button>
              <button onClick={() => onDelete(t.id)} aria-label={`Delete ${t.title}`}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
