import React, { Suspense } from "react";

const AvailabityLayout = ({ children }) => {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </div>
  );
};

export default AvailabityLayout;
