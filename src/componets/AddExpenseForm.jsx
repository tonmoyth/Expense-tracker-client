import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Button from "../share/button/Button";
const categories = ["Food", "Transport", "Shopping", "Others"];

const AddExpenseForm = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //    TanStack mutation for POST request
  const {mutate,isPending} = useMutation({
    mutationFn: async (newExpense) => {
      const res = await axiosSecure.post("/expenses", newExpense);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "expense added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // Refetch expense list after adding new expense
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  return (
    <div className="card p-4 ">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
      <form
      
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 card p-4 shadow-lg bg-[var(--secondary)]"
      >
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 0.01, message: "Amount must be greater than 0" },
              valueAsNumber: true,
            })}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: true })}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

          <Button isPending={isPending} level="Add Expense"></Button>
        {/* <button type="submit" className="btn btn-primary w-full">
         
        </button> */}
      </form>
    </div>
  );
};

export default AddExpenseForm;
