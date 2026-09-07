import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div>
      <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/dashboard" />
    </div>
  );
};

export default page;
