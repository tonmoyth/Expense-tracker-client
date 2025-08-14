import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const categoryColors = {
  Food: "badge-success",
  Transport: "badge-info",
  Shopping: "badge-primary",
  Others: "badge-ghost",
};

const ExpenseList = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch function
  const fetchExpenses = async () => {
    const res = await axiosSecure.get("/expenses");
    return res.data;
  };

  // TanStack Query Hook
  const {
    data: expenses,
    isLoading,
  } = useQuery({
    queryKey: ["expenses"], // Cache key
    queryFn: fetchExpenses, // Fetch function
  });

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="card p-4 shadow-lg overflow-x-auto bg-sky-200">
      <div className="flex gap-7">
        <h2 className="text-xl font-semibold mb-4">Expense List</h2>
        <p className="text-xl mb-6">Total Expense: ${0}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {expenses.map((exp) => (
          <div key={exp.id} className="card bg-white shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <span className={`badge ${categoryColors[exp.category]}`}>
                {exp.category}
              </span>
            </div>
            <p className="text-gray-600 mb-1">Amount: ${exp.amount}</p>
            <p className="text-gray-500 mb-3">Date: {exp.date}</p>
            <div className="flex gap-2 justify-end">
              <button className="btn btn-sm btn-warning ">Edit</button>
              <button className="btn btn-sm btn-error ">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
