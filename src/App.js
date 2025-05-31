import { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, [expenses]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  async function addExpense(expense) {
    await fetch("http://localhost:3001/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
  }
  async function deleteExpense(id) {
    await fetch("http://localhost:3001/expenses/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }

  const handleAdd = (expense) => {
    setExpenses([...expenses]);
    addExpense({ ...expense });
  };
  const handleDelete = (id) => {
    setExpenses([...expenses]);
    deleteExpense(id);
  };

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm onSubmit={handleAdd} />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
    </div>
  );
}

export default App;
