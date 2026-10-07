import { useExpenses } from "../context/ExpenseContext";
import CountUp from "./CountUp";

export default function SummaryCards() {
  const { income, expense, balance } = useExpenses();
  return (
    <section className="summary">
      <div className="balance">
        <span>Remaining balance</span>
        <h1 className={balance < 0 ? "neg" : ""}>
          <CountUp value={balance} />
        </h1>
        <p>{balance < 0 ? "You have spent more than you earned." : "Income minus expenses, updated live."}</p>
      </div>
      <div className="mini income">
        <span>Total income</span>
        <strong><CountUp value={income} /></strong>
      </div>
      <div className="mini expense">
        <span>Total expenses</span>
        <strong><CountUp value={expense} /></strong>
      </div>
    </section>
  );
}
