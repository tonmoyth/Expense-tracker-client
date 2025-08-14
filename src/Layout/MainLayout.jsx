import React from "react";
import AddExpenseForm from "../componets/AddExpenseForm";
import ExpenseList from "../componets/ExpenseList";


const MainLayout = () => {
 

  
  return (
    <div className=" ">
      <div className="md:w-11/12 mx-auto min-h-screen p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Personal Expense Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddExpenseForm addExpense={"addExpense"} />
          <ExpenseList
            expenses={"expenses"}
            deleteExpense={"deleteExpense"}
            updateExpense={"updateExpense"}
          />
        </div>
      </div>
      {/* footer */}
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default MainLayout;
