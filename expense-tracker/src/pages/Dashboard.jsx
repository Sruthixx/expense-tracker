import { Link } from "react-router-dom";
import SummaryCards from "../components/SummaryCards";
import TransactionList from "../components/TransactionList";
import { useExpenses } from "../context/ExpenseContext";

export default function Dashboard() {
  const { items } = useExpenses();
  return (
    <>
      <SummaryCards />
      <section className="card">
        <div className="head">
          <h2>Recent activity</h2>
          <Link to="/transactions" className="btn primary">Add transaction</Link>
        </div>
        <TransactionList items={items.slice(0, 5)} />
      </section>
    </>
  );
}
