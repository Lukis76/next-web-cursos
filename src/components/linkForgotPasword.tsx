import Link from "next/link";
import React from "react";

export const LinkForgotPassword = () => {
  return (
    <div className="text-right mt-2">
      <Link
        href="#"
        className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
      >
        Forgot Password?
      </Link>
    </div>
  );
};
