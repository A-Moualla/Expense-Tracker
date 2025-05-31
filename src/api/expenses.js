import API from "./api";

export const getExpenses = async () => {
  const response = await API.get("/expenses");
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await API.post("/expenses", expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`/expenses/${id}`);
  return response.data;
};
