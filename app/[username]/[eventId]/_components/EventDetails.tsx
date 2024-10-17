import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import React from "react";

const EventDetails = ({ event }) => {
  console.log(event);
  return (
    <div className="bg-white p-10 flex flex-col lg:w-1/3 w-full gap-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <div className="flex gap-5">
        <Avatar className="h-16 w-16 ">
          <AvatarImage src={event.user.imageUrl} alt={event.user.username} />
          <AvatarFallback>{event.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{event.user.name}</h1>
          <p className="text-lg font-semibold text-gray-500">
            @{event.user.username}
          </p>
        </div>
      </div>
      <div className="flex">
        <Clock className="mr-2" />
        <span className="text-lg">{event.duration} minutes</span>
      </div>
      <div className="flex">
        <Calendar className="mr-2" />
        <span className="text-lg">Google meet</span>
      </div>
      <span>
        <p className="text-gray-600">{event.description}</p>
      </span>
    </div>
  );
};

export default EventDetails;
