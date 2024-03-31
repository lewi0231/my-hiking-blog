import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div>
      <Header title="404 - Page Not Found" />
      <div className="flex justify-center">
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
