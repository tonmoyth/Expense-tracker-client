import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const categories = ["Food", "Transport", "Shopping", "Others"];

const Modal = ({ isOpen, close, cardId }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Mutation for adding expense
  const mutation = useMutation({
    mutationFn: async (newExpense) => {
      const res = await axiosSecure.patch(`/expenses/${cardId}`, newExpense);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["expenses"]);
      reset();
      close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    data.amount = parseFloat(data.amount);
    data.date = new Date(data.date); // store as Date object
    mutation.mutate(data)
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
          >
            <DialogTitle as="h3" className="text-lg text-center font-medium text-gray-800">
              Update Expense
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />

              <input
                type="number"
                placeholder="Amount"
                {...register("amount", { required: true })}
                className="input input-bordered w-full"
              />
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

              <input
                type="date"
                {...register("date", { required: true })}
                className="input input-bordered w-full"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Update..." : "Update"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
