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

const EventCard = ({ event, username, isPublic = false }: any) => {
  const [iscopied, setisCopied] = useState(false);

  const handleCopy = async () => {
    console.log("hl");
    await navigator.clipboard.writeText(
      `${window.location.origin}/${username}/${event.id}`
    );
    console.log("hlo");
    setisCopied(true);
    setTimeout(() => setisCopied(false), 2000);
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
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
