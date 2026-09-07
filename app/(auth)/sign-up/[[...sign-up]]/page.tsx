import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div>
      <SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/dashboard" />
    </div>
  );
};

export default page;
