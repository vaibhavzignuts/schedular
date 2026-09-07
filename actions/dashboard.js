"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { startOfDay, endOfDay } from "date-fns";

export async function getDashboardData() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const today = new Date();
  const todayStart = startOfDay(today);

  // Fetch all upcoming bookings
  const upcomingBookings = await db.booking.findMany({
    where: {
      userId: user.id,
      startTime: {
        gte: todayStart,
      },
    },
    include: {
      event: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  // Calculate metrics for TODAY only
  const todayEnd = endOfDay(today);
  const todayBookings = upcomingBookings.filter(b => b.startTime <= todayEnd);

  // Calculate metrics
  const totalAppointments = todayBookings.length;
  
  // Next appointment is the first one where startTime > now
  const nextAppointment = todayBookings.find((b) => b.startTime > today);

  // Count new patients (we use a simple heuristic for the demo: "New Patient Consultation" event type)
  const newPatients = todayBookings.filter((b) => b.event.title.toLowerCase().includes("new patient")).length;

  // Telehealth visits
  const telehealthVisits = todayBookings.filter((b) => b.event.isVirtual).length;

  // Completed
  const completedVisits = todayBookings.filter((b) => b.status === "COMPLETED").length;

  return {
    todayBookings,
    upcomingBookings,
    metrics: {
      totalAppointments,
      nextAppointmentTime: nextAppointment ? nextAppointment.startTime : null,
      newPatients,
      telehealthVisits,
      completedVisits,
    },
    username: user.username,
  };
}
