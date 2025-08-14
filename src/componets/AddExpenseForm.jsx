import React from "react";

const AddExpenseForm = () => {
  return (
    <div className="card p-4 ">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
      <form onSubmit={``} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={'title'}
        //   onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="input input-bordered w-full"
        //   value={amount}
        //   onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
        //   value={category}
        //   onChange={(e) => setCategory(e.target.value)}
        >
          {/* {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))} */}
        </select>
        <input
          type="date"
          className="input input-bordered w-full"
        //   value={date}
        //   onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
