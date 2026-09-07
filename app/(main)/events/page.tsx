import { Suspense } from "react";
import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/EventCard";
import { Plus, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Appointment Types</h1>
          <p className="text-slate-500 mt-1">Manage the types of services and appointments you offer.</p>
        </div>
        <Link href="/events?create=true">
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> New Appointment Type
          </Button>
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start">
        <div className="bg-blue-100 text-blue-700 p-2 rounded-full mr-4 shrink-0">
          <Info className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-800 text-sm">What are Appointment Types?</h3>
          <p className="text-blue-700 text-sm mt-1">
            These are your reusable meeting templates (e.g., "30 Min Follow-up"). Patients use these templates to book <Link href="/meetings" className="underline font-medium hover:text-blue-900">Scheduled Meetings</Link> on your calendar.
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="text-slate-500 p-8 text-center">Loading appointment types...</div>}>
        <Events />
      </Suspense>
    </div>
  );
}

async function Events() {
  const { events, username } = await getUserEvents();

  if (events.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-12 text-center">
        <p className="text-slate-500 mb-4">You haven't created any appointment types yet.</p>
        <Link href="/events?create=true">
          <Button variant="outline" className="border-slate-300">Create your first appointment type</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {events?.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  );
}
