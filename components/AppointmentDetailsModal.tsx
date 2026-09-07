"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, UserCircle, Video, FileText, CheckCircle2, CalendarRange, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { updateBookingStatus } from "@/actions/bookings";
import { cancelMeeting } from "@/actions/meetings";
import { useRouter } from "next/navigation";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: any;
}

const statusConfig: any = {
  CONFIRMED: { color: "bg-blue-100 text-blue-700", label: "Confirmed" },
  CHECKED_IN: { color: "bg-orange-100 text-orange-700", label: "Checked In" },
  IN_PROGRESS: { color: "bg-purple-100 text-purple-700", label: "In Progress" },
  COMPLETED: { color: "bg-emerald-100 text-emerald-700", label: "Completed" },
  CANCELLED: { color: "bg-slate-100 text-slate-600", label: "Cancelled" },
  NO_SHOW: { color: "bg-red-100 text-red-700", label: "No Show" },
};

export default function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Secondary Modals State
  const [earlyCheckInOpen, setEarlyCheckInOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!appointment) return null;

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await updateBookingStatus(appointment.raw.id, newStatus);
      setIsLoading(false);
      if (res?.success) {
        router.refresh();
        onClose(); // Close the main modal after updating
      } else {
        console.error("Failed to update status:", res?.error);
        setErrorMsg(`Failed to update status: ${res?.error || 'Unknown error'}`);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setErrorMsg("A network error occurred while updating the status.");
    }
  };

  const handleCancelMeeting = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const res = await cancelMeeting(appointment.raw.id);
      setIsLoading(false);
      if (res?.success) {
        router.refresh();
        setCancelConfirmOpen(false);
        onClose();
      } else {
        setErrorMsg(`Failed to cancel meeting: ${res?.error || 'Unknown error'}`);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setErrorMsg("A network error occurred while canceling the meeting.");
    }
  };

  const handleCheckInClick = () => {
    const now = new Date();
    const startTime = new Date(appointment.raw.startTime);
    // If current time is earlier than the appointment start time
    if (now < startTime) {
      setEarlyCheckInOpen(true);
    } else {
      handleStatusUpdate("CHECKED_IN");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
          // If closing the main modal, ensure secondary ones are closed too
          setEarlyCheckInOpen(false);
          setCancelConfirmOpen(false);
          setRescheduleOpen(false);
          onClose();
        }
      }}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex justify-between items-start">
            <div>
              <Badge variant="secondary" className={`mb-2 ${statusConfig[appointment.status]?.color}`}>
                {statusConfig[appointment.status]?.label}
              </Badge>
              {errorMsg && (
                <div className="mb-2 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
                  {errorMsg}
                </div>
              )}
              <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {appointment.patientName}
                {appointment.isNewPatient && (
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">New</Badge>
                )}
              </DialogTitle>
              <p className="text-sm font-medium text-slate-600 mt-1">{appointment.type}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Date</p>
                  <p className="text-sm text-slate-900 font-semibold">{appointment.date || new Date(appointment.raw.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Time & Duration</p>
                  <p className="text-sm text-slate-900 font-semibold">{appointment.time} ({appointment.duration} min)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                {appointment.isVirtual ? (
                  <Video className="h-5 w-5 text-purple-400 mt-0.5" />
                ) : (
                  <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                )}
                <div>
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  {appointment.isVirtual ? (
                    <div>
                      <p className="text-sm text-purple-700 font-semibold flex items-center gap-1">Virtual Visit</p>
                      {appointment.raw.meetLink && (
                        <a href={appointment.raw.meetLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">Google Meet</a>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-900 font-semibold">In-person</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserCircle className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Provider</p>
                  <p className="text-sm text-slate-900 font-semibold">Provider</p>
                </div>
              </div>
            </div>

            {appointment.raw.additionalInfo && (
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div className="w-full">
                    <p className="text-xs text-slate-500 font-medium mb-1">Appointment Notes</p>
                    <div className="bg-slate-50 border border-slate-100 rounded p-3 text-sm text-slate-700 min-h-[60px]">
                      {appointment.raw.additionalInfo}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions Footer */}
          <DialogFooter className="bg-slate-50 border-t border-slate-100 p-4 sm:justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              {appointment.status === 'CONFIRMED' && (
                <Button disabled={isLoading} size="sm" className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleCheckInClick}>
                  Check In
                </Button>
              )}
              {appointment.status === 'CHECKED_IN' && (
                <Button disabled={isLoading} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleStatusUpdate("IN_PROGRESS")}>
                  Start Visit
                </Button>
              )}
              {(appointment.status === 'IN_PROGRESS' || appointment.status === 'CHECKED_IN') && (
                <Button disabled={isLoading} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleStatusUpdate("COMPLETED")}>
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Complete
                </Button>
              )}
              {appointment.isVirtual && appointment.status !== 'COMPLETED' && (
                <Button size="sm" variant="outline" className="text-purple-700 border-purple-200 hover:bg-purple-50">
                  <Video className="mr-1 h-4 w-4" /> Join
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {appointment.status === 'COMPLETED' && (
                <Link href="/events">
                   <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
                     <CalendarRange className="mr-1 h-4 w-4" /> Schedule Follow-up
                   </Button>
                </Link>
              )}
              {appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELLED' && (
                <>
                  <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-900 border border-slate-200 bg-white" onClick={() => setRescheduleOpen(true)}>
                    Reschedule
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => setCancelConfirmOpen(true)}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Early Check-In Warning Dialog */}
      <Dialog open={earlyCheckInOpen} onOpenChange={setEarlyCheckInOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Early Check-In
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-slate-700">
            <p>Your appointment time has not arrived yet.</p>
            <p className="mt-2 text-sm text-slate-500">If you want an early scheduled meeting, please contact your admin.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEarlyCheckInOpen(false)}>Close</Button>
            {/* For testing/demo purposes, we can optionally allow them to force check-in if needed, but per the prompt we'll just show the warning */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Cancel Appointment</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-slate-700">
            <p>Are you sure you want to cancel this appointment?</p>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone and the patient will be notified.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={isLoading} onClick={() => setCancelConfirmOpen(false)}>Keep Appointment</Button>
            <Button variant="destructive" disabled={isLoading} onClick={handleCancelMeeting}>Yes, Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-blue-600">Reschedule Appointment</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-slate-700">
            <p>Please contact your admin to reschedule this appointment.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setRescheduleOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
