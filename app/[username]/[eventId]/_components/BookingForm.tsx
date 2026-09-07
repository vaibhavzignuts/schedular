"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/actions/bookings";
import { bookingSchema } from "@/app/lib/validators";
import "react-day-picker/style.css";
import useFetch from "@/app/hooks/use-fetch";
import { CalendarCheck, ChevronRight, Video, MapPin } from "lucide-react";

export default function BookingForm({ event, availability }: any) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (formData: any) => {
    if (!selectedDate || !selectedTime) return;

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: formData.name,
      email: formData.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: formData.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  const availableDays = availability.map((day: any) => new Date(day.date));

  const timeSlots = selectedDate
    ? availability.find(
        (day: any) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  if (data) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white min-h-screen">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CalendarCheck className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Appointment Confirmed</h2>
            <p className="text-slate-500">Your {event.title} is scheduled.</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-left space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">When</p>
              <p className="font-bold text-slate-900">{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""} at {selectedTime}</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Where</p>
              {event.isVirtual ? (
                <div className="flex items-center gap-2 text-purple-700 font-medium">
                  <Video className="h-4 w-4" /> Virtual Visit
                </div>
              ) : (
                <div className="flex items-center gap-2 text-blue-700 font-medium">
                  <MapPin className="h-4 w-4" /> In-person
                </div>
              )}
            </div>

            {data.meetLink && event.isVirtual && (
              <div className="pt-4 border-t border-slate-200">
                <a
                  href={data.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold h-11 px-8 rounded-md transition-colors"
                >
                  <Video className="mr-2 h-4 w-4" /> Join Virtual Visit
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 lg:p-12 bg-white flex flex-col justify-center min-h-screen">
      <div className="max-w-3xl mx-auto w-full">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Select a Date & Time</h2>
              <p className="text-slate-500 mt-1">Choose a convenient slot for your appointment.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-shrink-0">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  disabled={[{ before: new Date() }]}
                  modifiers={{ available: availableDays }}
                  modifiersStyles={{
                    available: {
                      background: "rgb(236, 253, 245)", // emerald-50
                      color: "rgb(4, 120, 87)", // emerald-700
                      fontWeight: "600",
                    },
                    selected: {
                      background: "rgb(15, 23, 42)", // slate-900
                      color: "white",
                    }
                  }}
                  className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm"
                />
              </div>
              
              <div className="flex-1 w-full">
                {selectedDate ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-700 pb-2 border-b border-slate-100">
                      {format(selectedDate, "EEEE, MMMM d")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                      {timeSlots.length > 0 ? (
                        timeSlots.map((slot: string) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={selectedTime === slot ? "default" : "outline"}
                            className={`h-12 text-base ${selectedTime === slot ? "bg-slate-900" : "hover:border-slate-400"}`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </Button>
                        ))
                      ) : (
                        <p className="text-slate-500 text-sm col-span-2">No availability on this date.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <CalendarCheck className="h-12 w-12 mb-3 text-slate-300" />
                    <p>Select a date to view available times</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-100">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedDate || !selectedTime}
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Patient Details</h2>
              <p className="text-slate-500 mt-1">Please provide your contact information to finalize the booking.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <Input {...register("name")} placeholder="Jane Doe" className="h-12" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <Input {...register("email")} type="email" placeholder="jane@example.com" className="h-12" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes for Provider (Optional)</label>
                <Textarea
                  {...register("additionalInfo")}
                  placeholder="Is there anything specific you would like to discuss?"
                  className="min-h-[100px] resize-none"
                />
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="h-12 px-6"
                >
                  Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold">
                  {loading ? "Confirming..." : "Confirm Appointment"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
