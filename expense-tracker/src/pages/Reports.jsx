import { useMemo } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { formatMoney } from "../utils/constants";

export default function Reports() {
  const { items, income, expense } = useExpenses();

  const breakdown = useMemo(() => {
    const map = {};
    items.filter((i) => i.type === "expense").forEach((i) => (map[i.category] = (map[i.category] || 0) + i.amount));
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [items]);

  const spentPct = income > 0 ? Math.min(Math.round((expense / income) * 100), 100) : expense > 0 ? 100 : 0;

  return (
    <div className="split">
      <section className="card">
        <h2>Spending by category</h2>
        {breakdown.length === 0 && <div className="empty">Add an expense to see your breakdown.</div>}
        {breakdown.map(([cat, amt], i) => (
          <div className="bar-row" key={cat}>
            <div className="bar-label"><span>{cat}</span><b>{formatMoney(amt)}</b></div>
            <div className="bar"><i style={{ width: `${(amt / expense) * 100}%`, animationDelay: `${i * 90}ms` }} /></div>
          </div>
        ))}
      </section>
      <section className="card">
        <h2>Income used</h2>
        <div className="ring" style={{ "--p": spentPct }}><span>{spentPct}%</span></div>
        <p className="muted">
          You have spent {formatMoney(expense)} of {formatMoney(income)} earned.
        </p>
      </section>
    </div>
  );
}
