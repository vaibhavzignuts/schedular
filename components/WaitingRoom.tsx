import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNowStrict } from "date-fns";

export default function WaitingRoom({ bookings = [] }: { bookings?: any[] }) {
  // Only show patients who are checked in
  const waitingPatients = bookings.filter(b => b.status === "CHECKED_IN").map(b => {
    // For demo purposes, we'll calculate waiting time from start time. 
    // In a real app, there'd be a separate 'checkedInAt' timestamp.
    const waitTime = formatDistanceToNowStrict(new Date(b.startTime));
    return {
      id: b.id,
      name: b.name,
      type: b.event?.title || "Appointment",
      waitingTimeText: waitTime,
    }
  });

  if (waitingPatients.length === 0) {
    return null;
  }

  return (
    <Card className="border-orange-100 shadow-sm bg-orange-50/30">
      <CardHeader className="pb-3 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-orange-800 flex items-center">
            <UserCircle className="mr-2 h-5 w-5" />
            Waiting Room
            <Badge variant="secondary" className="ml-3 bg-orange-100 text-orange-800 hover:bg-orange-200">
              {waitingPatients.length} Waiting
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {waitingPatients.map((patient) => (
            <div
              key={patient.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-orange-100 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {patient.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-900">{patient.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                    <span>{patient.type}</span>
                    <span>•</span>
                    <span className="flex items-center text-orange-600 font-medium">
                      <Clock className="mr-1 h-3 w-3" /> Waiting {patient.waitingTimeText}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-2">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto shadow-sm">
                  <Play className="mr-1 h-4 w-4" /> Start Visit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
