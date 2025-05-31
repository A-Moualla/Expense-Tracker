import { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import { getExpenses, addExpense, deleteExpense } from "./api/expenses";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  async function fetchExpenses() {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  async function handleAdd(expense) {
    try {
      await addExpense({ ...expense });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding Expense:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting Expense:", error);
    }
  }

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
