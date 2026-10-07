export const CATEGORIES = {
  expense: ["Food", "Transport", "Shopping", "Bills", "Health", "Education", "Entertainment", "Other"],
  income: ["Salary", "Freelance", "Gift", "Investment", "Other"],
};

export const formatMoney = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
