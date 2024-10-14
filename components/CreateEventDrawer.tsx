"use client";
import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { EventForm } from "./EventForm";

export function CreateEventDrawer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const create = searchParams.get("create");
    setIsOpen(create === "true");
  }, [searchParams]);

  const handleSubmit = () => {
    // Add your submit logic here

    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window?.location.pathname);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>Create Event</DrawerTitle>
            <DrawerDescription>Set up your new event here.</DrawerDescription>
          </DrawerHeader>

          <div className="p-4">
            <EventForm onSubmitForm={handleSubmit} />
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
