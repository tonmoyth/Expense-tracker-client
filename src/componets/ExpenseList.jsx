import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../share/modal/Modal";
import Swal from "sweetalert2";
import Button from "../share/button/Button";
import Loading from "../share/Loading/Loading";


const categoryColors = {
  Food: "badge-success",
  Transport: "badge-info",
  Shopping: "badge-primary",
  Others: "badge-ghost",
};
const categories = ["Food", "Transport", "Shopping", "Others"];

const ExpenseList = () => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const [cardId, setCardId] = useState(0);
  const [category,setCategory] = useState('');


  const queryClient = useQueryClient();

  // Fetch function
  const fetchExpenses = async () => {
    const res = await axiosSecure.get("/expenses");
    return res.data;
  };

  // TanStack Query Hook
  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const expensesData = category
  ? expenses?.filter(e => e.category === category)
  : expenses;

  // Mutation for delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/expenses/${id}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["expenses"]);
      Swal.fire({
        title: "Deleted!",
        text: `${data.message}`,
        icon: "success",
      });
    },
  });

  const handleDelete = (expenseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(expenseId);
      }
    });
  };

  function open(id) {
    setCardId(id);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  if (isLoading)
    return <Loading></Loading>;

  //   Total Expense Amount
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <div className="card p-4  overflow-x-auto bg-[var(--background)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <h2 className="text-xl font-semibold mb-4">Expense List</h2>
          <p className="text-xl mb-6">Total Amount: ${totalExpense}</p>
          <select
            className="select select-bordered mb-2"
           onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {expensesData?.map((exp) => (
            <div
              key={exp._id}
              className="card bg-[var(--secondary)] shadow-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <span className={`badge ${categoryColors[exp.category]}`}>
                  {exp.category}
                </span>
              </div>
              <p className=" mb-1">Amount: ${exp.amount}</p>
              <p className=" mb-3">
                Date: {new Date(exp.date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 justify-end">
                <Button onClick={() => open(exp._id)} level="Edit"></Button>
                <Button
                  onClick={() => handleDelete(exp._id)}
                  level="Delete"
                ></Button>

              
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Expense update modal */}
      <Modal cardId={cardId} isOpen={isOpen} close={close}></Modal>
    </div>
  );
};

export default ExpenseList;
