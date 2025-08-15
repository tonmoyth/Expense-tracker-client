import React from "react";

const Button = ({ level, onClick,isPending }) => {
  return (
    <button
      onClick={onClick}
      href="#_"
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-[var(--primary)] hover:bg-gradient-to-r hover:[var(--primary)] hover:[var(--primary)] text-white hover:ring-1 hover:ring-offset-1 hover:[var(--primary)] transition-all ease-out duration-300"
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">{isPending ? <span className="loading loading-spinner loading-md"></span> : level}</span>
    </button>
  );
};

export default Button;
