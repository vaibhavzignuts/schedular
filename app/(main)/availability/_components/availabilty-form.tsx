"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { updateAvailability } from "@/actions/availability";
import { availabilitySchema } from "@/app/lib/validators";
import { timeSlots } from "../data";
import useFetch from "@/app/hooks/use-fetch";

export default function AvailabilityForm({ initialData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const {
    loading,
    error,
    fn: fnupdateAvailability,
  } = useFetch(updateAvailability);

  const onSubmit = async (data) => {
    await fnupdateAvailability(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">Weekly Working Hours</h3>
        <div className="space-y-4">
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map((day) => {
            const isAvailable = watch(`${day}.isAvailable`);

            return (
              <div key={day} className="flex items-center space-x-4">
                <Controller
                  name={`${day}.isAvailable`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        setValue(`${day}.isAvailable`, checked);
                        if (!checked) {
                          setValue(`${day}.startTime`, "09:00");
                          setValue(`${day}.endTime`, "17:00");
                        }
                      }}
                      className="data-[state=checked]:bg-primary"
                    />
                  )}
                />
                <span className="w-28 font-medium text-slate-700">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
                {isAvailable ? (
                  <div className="flex items-center space-x-3">
                    <Controller
                      name={`${day}.startTime`}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-32 bg-slate-50">
                            <SelectValue placeholder="Start Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <span className="text-slate-400">to</span>
                    <Controller
                      name={`${day}.endTime`}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-32 bg-slate-50">
                            <SelectValue placeholder="End Time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors[day]?.endTime && (
                      <span className="text-red-500 text-sm ml-2">
                        {errors[day].endTime.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400 italic text-sm py-2">Unavailable</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">Booking Rules</h3>
        <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
          <div className="flex-1">
            <h4 className="font-medium text-slate-800">Minimum gap between bookings</h4>
            <p className="text-sm text-slate-500">Add buffer time to prepare for your next appointment.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              {...register("timeGap", {
                valueAsNumber: true,
              })}
              className="w-20 text-center"
            />
            <span className="text-slate-600 font-medium">mins</span>
          </div>

          {errors.timeGap && (
            <span className="text-red-500 text-sm block mt-1">{errors.timeGap.message}</span>
          )}
        </div>
      </div>
      
      {error && <div className="text-red-500 text-sm">{error?.message}</div>}
      
      <div className="pt-4 border-t border-slate-100">
        <Button type="submit" disabled={loading} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-8">
          {loading ? "Saving Changes..." : "Save Availability"}
        </Button>
      </div>
    </form>
  );
}
