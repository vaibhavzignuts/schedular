import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Video, CheckCircle2, Clock, Plus, BarChart2, Settings, CalendarRange } from "lucide-react";
import Link from "next/link";
import DailySchedule from "@/components/DailySchedule";
import WaitingRoom from "@/components/WaitingRoom";
import { getDashboardData } from "@/actions/dashboard";
import { formatDistanceToNow } from "date-fns";

export default async function DashboardPage() {
  const user = await currentUser();
  const data = await getDashboardData();
  
  const { metrics, upcomingBookings, todayBookings } = data;

  const getNextAppointmentText = () => {
    if (!metrics.nextAppointmentTime) return "No more appointments today";
    return `Next in ${formatDistanceToNow(new Date(metrics.nextAppointmentTime))}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 px-4 mt-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, Dr. {user?.firstName || "Provider"}
          </h1>
          <p className="text-slate-500 mt-1">Here is what your schedule looks like today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/events?create=true">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" /> New Appointment Type
            </Button>
          </Link>
          <Link href={`/${data.username || "demo"}`}>
            <Button variant="outline" className="shadow-sm border-slate-200">
              <CalendarRange className="mr-2 h-4 w-4" /> View Booking Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Today's Appointments</CardTitle>
            <div className="h-8 w-8 bg-blue-50 rounded-full flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{metrics.totalAppointments}</div>
            <p className="text-xs text-slate-500 mt-1">{getNextAppointmentText()}</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">New Patients</CardTitle>
            <div className="h-8 w-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{metrics.newPatients}</div>
            <p className="text-xs text-slate-500 mt-1">First time consultations</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Telehealth Visits</CardTitle>
            <div className="h-8 w-8 bg-purple-50 rounded-full flex items-center justify-center">
              <Video className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{metrics.telehealthVisits}</div>
            <p className="text-xs text-slate-500 mt-1">Virtual appointments</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completed</CardTitle>
            <div className="h-8 w-8 bg-slate-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{metrics.completedVisits}</div>
            <p className="text-xs text-slate-500 mt-1">Out of {metrics.totalAppointments} total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Schedule & Waiting Room */}
        <div className="lg:col-span-2 space-y-8">
          <WaitingRoom bookings={todayBookings} />
          <DailySchedule bookings={upcomingBookings} />
        </div>
        
        {/* Right Column: Quick Actions & Profile Summary */}
        <div className="space-y-8">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Link href="/meetings" className="w-full">
                <Button variant="outline" className="w-full justify-start font-normal bg-slate-50/50 hover:bg-slate-100 border-slate-200">
                  <Calendar className="mr-3 h-4 w-4 text-blue-600" /> Scheduled Meetings
                </Button>
              </Link>
              {/* Note: since this is now a server component, onClick won't work natively on a generic Button without it being a Client Component. However, these are just links and quick actions. We can just keep it as a link to a mock page or remove onClick */}
              <Button variant="outline" className="w-full justify-start font-normal bg-slate-50/50 hover:bg-slate-100 border-slate-200">
                <Clock className="mr-3 h-4 w-4 text-orange-600" /> Block Time
              </Button>
              <Link href="/availability" className="w-full">
                <Button variant="outline" className="w-full justify-start font-normal bg-slate-50/50 hover:bg-slate-100 border-slate-200">
                  <Settings className="mr-3 h-4 w-4 text-slate-600" /> Update Availability
                </Button>
              </Link>
              <Link href="/events" className="w-full">
                <Button variant="outline" className="w-full justify-start font-normal bg-slate-50/50 hover:bg-slate-100 border-slate-200">
                  <Settings className="mr-3 h-4 w-4 text-slate-600" /> Appointment Types
                </Button>
              </Link>
              <Link href="/analytics" className="w-full">
                <Button variant="outline" className="w-full justify-start font-normal bg-slate-50/50 hover:bg-slate-100 border-slate-200">
                  <BarChart2 className="mr-3 h-4 w-4 text-emerald-600" /> Scheduling Insights
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
