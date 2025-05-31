import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import { getExpenses, addExpense, deleteExpense } from "./api/expenses";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

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
      navigate("/");
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
      <nav>
        <ul>
          <li>
            <Link to="/">Expenses</Link>
          </li>
          <li>
            <Link to="/add">Add Expense</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="mb-3">
                <ExpenseFilter
                  onSelectCategory={(category) => setSelectedCategory(category)}
                />
              </div>
              <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
            </div>
          }
        />
        <Route
          path="/add"
          element={
            <div className="mb-5">
              <ExpenseForm onSubmit={handleAdd} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
function Home() {
  return <h2>الصفحة الرئيسية</h2>;
}

function About() {
  return <h2>من نحن</h2>;
}

function Contact() {
  return <h2>اتصل بنا</h2>;
}

export default App;
