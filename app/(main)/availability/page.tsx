import React from "react";
import AvailabilityForm from "./_components/availabilty-form";
import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";

const Availability = async () => {
  const availability = await getUserAvailability();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Availability Management</h1>
        <p className="text-slate-500 mt-1">Configure your working hours, breaks, and booking rules.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <AvailabilityForm initialData={availability || defaultAvailability} />
      </div>
    </div>
  );
};

export default Availability;
