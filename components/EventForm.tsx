"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import useFetch from "@/app/hooks/use-fetch";
import { createEvent } from "@/actions/events";
import { useRouter } from "next/navigation";
import { Switch } from "./ui/switch";

// Schema for form (matches validators.js)
const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
  duration: z.number().int().positive("Duration must be a positive number"),
  isPrivate: z.boolean(),
  isVirtual: z.boolean().optional().default(false),
  color: z.string().optional(),
});

interface EventFormProps {
  onSubmitForm: () => void;
}

export type EventFormData = z.infer<typeof eventSchema>;

export function EventForm({ onSubmitForm }: EventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
      isVirtual: false,
      color: "blue",
    },
  });

  const { loading, error, fn: fncreateEvent } = useFetch(createEvent);
  const router = useRouter();

  const onSubmit = (data: EventFormData) => {
    fncreateEvent(data);
    if (!loading && !error) onSubmitForm();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-4">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
          Appointment Type Name
        </label>
        <Input id="title" {...register("title")} className="mt-1.5" placeholder="e.g. New Patient Consultation" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
          Description / Instructions for Patient
        </label>
        <Input id="description" {...register("description")} className="mt-1.5" placeholder="Please bring your ID and insurance card." />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-slate-700">
            Duration (minutes)
          </label>
          <Input id="duration" type="number" {...register("duration", { valueAsNumber: true })} className="mt-1.5" />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-semibold text-slate-700">
            Category Color
          </label>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || "blue"}>
                <SelectTrigger className="w-full mt-1.5">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue (Standard)</SelectItem>
                  <SelectItem value="purple">Purple (Virtual)</SelectItem>
                  <SelectItem value="emerald">Green (New Patient)</SelectItem>
                  <SelectItem value="orange">Orange (Urgent)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="isVirtual" className="block text-sm font-semibold text-slate-700">
              Virtual Visit (Telehealth)
            </label>
            <p className="text-xs text-slate-500 mt-0.5">Generate a meeting link for this appointment type.</p>
          </div>
          <Controller
            name="isVirtual"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} id="isVirtual" />
            )}
          />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="isPrivate" className="block text-sm font-semibold text-slate-700">
              Private Appointment Type
            </label>
            <p className="text-xs text-slate-500 mt-0.5">Hide this from your public booking page.</p>
          </div>
          <Controller
            name="isPrivate"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} id="isPrivate" />
            )}
          />
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700">Automated Reminders</label>
          <p className="text-xs text-slate-500 mt-0.5 mb-3">Send notifications to patients before their visit.</p>
          <Select defaultValue="24h">
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select reminder schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No reminders</SelectItem>
              <SelectItem value="2h">2 hours before</SelectItem>
              <SelectItem value="24h">24 hours before</SelectItem>
              <SelectItem value="both">24 hours & 2 hours before</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm h-11">
        {loading ? "Creating..." : "Save Appointment Type"}
      </Button>
    </form>
  );
}
