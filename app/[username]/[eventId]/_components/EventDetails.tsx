import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

const EventDetails = ({ event }: any) => {
  return (
    <div className="bg-slate-50 border-r border-slate-200 p-8 lg:p-12 flex flex-col lg:w-1/3 w-full gap-8 h-full min-h-screen">
      <div>
        <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Book Appointment</h1>
        <h2 className="text-3xl font-extrabold text-slate-900">{event.title}</h2>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <Avatar className="h-14 w-14 border border-slate-200">
          <AvatarImage src={event.user?.imageUrl} alt={event.user?.username} />
          <AvatarFallback className="bg-slate-100 text-slate-700 font-bold">
            {event.user?.name?.charAt(0) || "D"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-900">{event.user?.name || "Provider"}</h3>
          <p className="text-sm font-medium text-slate-500">
            @{event.user?.username}
          </p>
        </div>
      </div>

      <div className="space-y-4 text-slate-700 font-medium">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 text-slate-600" />
          </div>
          <span className="text-lg">{event.duration} minutes</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
            {event.isVirtual ? <Video className="h-5 w-5 text-purple-600" /> : <MapPin className="h-5 w-5 text-blue-600" />}
          </div>
          <div className="flex flex-col">
             <span className="text-lg">{event.isVirtual ? "Virtual Visit" : "In-Person Visit"}</span>
             <span className="text-sm text-slate-500 font-normal">
               {event.isVirtual ? "Meeting link will be provided." : "Location details will be shared."}
             </span>
          </div>
        </div>
      </div>

      {event.description && (
        <div className="mt-4 border-t border-slate-200 pt-8">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">Appointment Details</h4>
          <p className="text-slate-600 leading-relaxed text-sm">
            {event.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
