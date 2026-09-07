"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cancelMeeting } from "@/actions/meetings";
import { useRouter } from "next/navigation";
import useFetch from "@/app/hooks/use-fetch";
import { useState } from "react";

export default function CancelMeetingButton({ meetingId }) {
  const router = useRouter();

  const { loading, error, fn: fnCancelMeeting } = useFetch(cancelMeeting);
  const [isOpen, setIsOpen] = useState(false);

  const handleCancelClick = () => {
    setIsOpen(true);
  };

  const handleConfirmCancel = async () => {
    await fnCancelMeeting(meetingId);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <Button variant="destructive" onClick={handleCancelClick} disabled={loading}>
          {loading ? "Canceling..." : "Cancel Meeting"}
        </Button>
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Cancel Meeting</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-slate-700">
            <p>Are you sure you want to cancel this meeting?</p>
            <p className="mt-2 text-sm text-slate-500">This action cannot be undone and the patient will be notified.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={loading} onClick={() => setIsOpen(false)}>Keep Meeting</Button>
            <Button variant="destructive" disabled={loading} onClick={handleConfirmCancel}>Yes, Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
