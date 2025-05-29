import React from "react";

const ExpenseFilter = ({ onSelectCategory }) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelectCategory(event.target.value)}
    >
      <option value="">All</option>
      <option value="food">food</option>
      <option value="drinks">drinks</option>
      <option value="clothes">clothes</option>
    </select>
  );
};

export default ExpenseFilter;
