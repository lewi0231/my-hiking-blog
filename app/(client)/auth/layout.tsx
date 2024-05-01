import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen py-40 flex justify-center border-2 border-black">
      {children}
    </div>
  );
};

export default AuthLayout;
