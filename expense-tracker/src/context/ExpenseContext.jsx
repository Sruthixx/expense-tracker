import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();
export const useExpenses = () => useContext(ExpenseContext);

const load = () => {
  try {
    return JSON.parse(localStorage.getItem("ledgerly-items")) || [];
  } catch {
    return [];
  }
};

export function ExpenseProvider({ children }) {
  const [items, setItems] = useState(load);

  // Persist every change in the browser
  useEffect(() => {
    localStorage.setItem("ledgerly-items", JSON.stringify(items));
  }, [items]);

  const add = (t) => setItems((p) => [{ ...t, id: Date.now() }, ...p]);
  const update = (t) => setItems((p) => p.map((x) => (x.id === t.id ? t : x)));
  const remove = (id) => setItems((p) => p.filter((x) => x.id !== id));

  const sum = (type) => items.filter((i) => i.type === type).reduce((s, i) => s + i.amount, 0);
  const income = sum("income");
  const expense = sum("expense");

  return (
    <ExpenseContext.Provider value={{ items, add, update, remove, income, expense, balance: income - expense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
