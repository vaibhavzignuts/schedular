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
import { Button } from "./ui/button";
import { Link, Trash2 } from "lucide-react";
import useFetch from "@/app/hooks/use-fetch";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/events";

const EventCard = ({ event, username, isPublic = false }: any) => {
  const [iscopied, setisCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/${username}/${event.id}`
    );
    setisCopied(true);
    setTimeout(() => setisCopied(false), 2000);
  };

  const { loading, error, fn: fnDeleteevent } = useFetch(deleteEvent);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteevent(event.id);
      router.refresh();
    }
  };

  return (
    <div>
      <Card className="flex flex-col gap-2 cursor-pointer">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>
              {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
            </span>
            <span>{event._count.bookings} Bookings</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCopy}>
            <Link className="mr-2 h-4 w-4" />{" "}
            {iscopied ? "Copied" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="mr-2 h-4 w-4" />{" "}
            {loading ? "deleting..." : "delete"}
          </Button>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
