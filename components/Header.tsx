import React from "react";

const Header = ({ title = "" }) => {
  return (
    <header className="py-14 px-4 mb-12 text-center">
      <h2 className="text-4xl uppercase mx-auto max-w-2xl font-bold">
        {title}
      </h2>
    </header>
  );
};

export default Header;
