import { useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "abc", amount: 10, category: "tecno" },
    { id: 2, description: "sasa", amount: 20, category: "tecno" },
    { id: 3, description: "abasasc", amount: 30, category: "tecno" },
    { id: 4, description: "abasasac", amount: 40, category: "tecno" },
  ]);

  return (
    <ExpenseList
      expenses={expenses}
      onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
    />
  );
}

export default App;
