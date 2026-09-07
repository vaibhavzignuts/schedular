"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Link, Trash2, Video, MapPin, Clock, Users } from "lucide-react";
import useFetch from "@/app/hooks/use-fetch";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/events";
import { Badge } from "./ui/badge";

const colorMap: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
};

const EventCard = ({ event, username, isPublic = false }: any) => {
  const [iscopied, setisCopied] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(
      `${window.location.origin}/${username}/${event.id}`
    );
    setisCopied(true);
    setTimeout(() => setisCopied(false), 2000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target instanceof Element && e.target.closest("button")) {
      return;
    }
    window?.open(
      `${window?.location.origin}/${username}/${event.id}`,
      "_blank"
    );
  };

  const { loading, fn: fnDeleteevent } = useFetch(deleteEvent);
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    await fnDeleteevent(event.id);
    setIsDeleteOpen(false);
    router.refresh();
  };

  const bgColorClass = event.color ? colorMap[event.color] || "bg-slate-500" : "bg-blue-500";

  return (
    <>
    <Card
      className="flex flex-col h-full cursor-pointer transition-all hover:shadow-md border-slate-200 overflow-hidden group"
      onClick={handleCardClick}
    >
      <div className={`h-2 w-full ${bgColorClass}`} />
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1">{event.title}</CardTitle>
          {event.isVirtual ? (
             <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 shrink-0">
               <Video className="mr-1 h-3 w-3" /> Virtual
             </Badge>
          ) : (
             <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 shrink-0">
               <MapPin className="mr-1 h-3 w-3" /> In-person
             </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2 mt-2 h-10">
          {event.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 mt-auto">
        <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Clock className="h-4 w-4 text-slate-400" />
            {event.duration} min
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
            <Users className="h-4 w-4 text-slate-400" />
            {event._count?.bookings || 0} Bookings
          </div>
          
          {!event.isPrivate && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">
              Public
            </div>
          )}
        </div>
      </CardContent>
      
      {!isPublic && (
        <CardFooter className="flex gap-2 pt-0">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex-1 bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
            size="sm"
          >
            <Link className="mr-2 h-4 w-4" />
            {iscopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="ghost"
            onClick={handleDeleteClick}
            disabled={loading}
            className="px-3 text-slate-400 hover:text-red-600 hover:bg-red-50"
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </CardFooter>
      )}
    </Card>

    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Appointment Type</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-slate-700">
          <p>Are you sure you want to delete this appointment type?</p>
          <p className="mt-2 text-sm text-slate-500">This action cannot be undone.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" disabled={loading} onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" disabled={loading} onClick={handleConfirmDelete}>Yes, Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default EventCard;
