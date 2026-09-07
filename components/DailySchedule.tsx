"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Video, MapPin, FileText } from "lucide-react";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import { format } from "date-fns";

const statusConfig: Record<string, { color: string; label: string }> = {
  CONFIRMED: { color: "bg-blue-100 text-blue-700 hover:bg-blue-200", label: "Confirmed" },
  CHECKED_IN: { color: "bg-orange-100 text-orange-700 hover:bg-orange-200", label: "Checked In" },
  IN_PROGRESS: { color: "bg-purple-100 text-purple-700 hover:bg-purple-200", label: "In Progress" },
  COMPLETED: { color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200", label: "Completed" },
  CANCELLED: { color: "bg-slate-100 text-slate-600 hover:bg-slate-200", label: "Cancelled" },
  NO_SHOW: { color: "bg-red-100 text-red-700 hover:bg-red-200", label: "No Show" },
};

export default function DailySchedule({ bookings = [] }: { bookings?: any[] }) {
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  // Map db bookings to our UI format
  const scheduleItems = bookings.map((b) => {
    return {
      id: b.id,
      date: format(new Date(b.startTime), "MMM d"),
      time: format(new Date(b.startTime), "h:mm a"),
      patientName: b.name,
      type: b.event?.title || "Appointment",
      duration: b.event?.duration || 30,
      isVirtual: b.event?.isVirtual || false,
      status: b.status || "CONFIRMED",
      isNewPatient: b.event?.title?.toLowerCase().includes("new patient"),
      raw: b, // pass raw booking for the modal
    };
  });

  return (
    <>
      <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-slate-500" />
            Upcoming Schedule
          </CardTitle>
          <div className="text-sm font-medium text-slate-500">
            {bookings.length} upcoming
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-0">
        <div className="divide-y divide-slate-100">
          {scheduleItems.length === 0 && (
            <div className="p-8 text-center text-slate-500">No appointments scheduled for today.</div>
          )}
          {scheduleItems.map((item) => {
            const isPast = item.status === "COMPLETED" || item.status === "CANCELLED" || item.status === "NO_SHOW";
            return (
              <div 
                key={item.id} 
                className={`p-4 transition-colors hover:bg-slate-50 cursor-pointer flex gap-4 ${isPast ? 'opacity-70' : ''}`}
                title="Click to view details"
                onClick={() => setSelectedAppointment(item)}
              >
                {/* Time Column */}
                <div className="w-20 shrink-0 text-right pt-1">
                  <p className="text-xs font-semibold text-slate-500 mb-1">{item.date}</p>
                  <p className="font-bold text-slate-900 text-sm">{item.time}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.duration} min</p>
                </div>
                
                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  <div className={`h-3 w-3 rounded-full z-10 ${item.status === 'CHECKED_IN' ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-slate-300'}`}></div>
                  <div className="w-px h-full bg-slate-200 absolute top-3"></div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white border border-slate-100 rounded-lg p-3 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-base ${isPast ? 'text-slate-700' : 'text-slate-900'}`}>
                          {item.patientName}
                        </h4>
                        {item.isNewPatient && (
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1 font-medium">{item.type}</p>
                    </div>
                    <Badge variant="secondary" className={statusConfig[item.status]?.color || "bg-slate-100 text-slate-800"}>
                      {statusConfig[item.status]?.label || item.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                    <div className="flex items-center">
                      {item.isVirtual ? (
                        <><Video className="mr-1 h-3.5 w-3.5 text-purple-500" /> <span className="text-purple-700 font-medium">Virtual Visit</span></>
                      ) : (
                        <><MapPin className="mr-1 h-3.5 w-3.5" /> In-person</>
                      )}
                    </div>
                    {item.raw.additionalInfo && (
                      <div className="flex items-center">
                        <FileText className="mr-1 h-3.5 w-3.5" /> Notes
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      </Card>
      
      <AppointmentDetailsModal 
        isOpen={!!selectedAppointment} 
        onClose={() => setSelectedAppointment(null)} 
        appointment={selectedAppointment} 
      />
    </>
  );
}
