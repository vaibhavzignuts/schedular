import React from "react";
import AvailabilityForm from "./_components/availabilty-form";
import { getUserAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";

const Availability = async () => {
  const availability = await getUserAvailability();

  return (
    <div>
      <AvailabilityForm initialData={availability || defaultAvailability} />
    </div>
  );
};

export default Availability;
