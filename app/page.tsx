import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, Video, Users, Stethoscope, BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Manage your daily practice schedule and appointment types effortlessly.",
    },
    {
      icon: Clock,
      title: "Availability Management",
      description: "Set practice hours, breaks, and buffer times between patient visits.",
    },
    {
      icon: Video,
      title: "Telehealth Ready",
      description: "Seamlessly integrate virtual visits alongside in-person appointments.",
    },
    {
      icon: Users,
      title: "Patient Experience",
      description: "Provide a simple, mobile-friendly booking experience for your patients.",
    },
    {
      icon: Stethoscope,
      title: "Practice Workflow",
      description: "Track patient check-ins, waiting room status, and appointment lifecycles.",
    },
    {
      icon: BarChart2,
      title: "Scheduling Insights",
      description: "Gain operational visibility into cancellation rates and appointment volume.",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
              The modern scheduling platform for medical practices
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Streamline your <span className="text-teal-700">practice workflow</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-2xl">
              Schedulrr is designed for physicians. Manage appointments, coordinate telehealth visits, and improve the patient booking experience—all from one premium dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white h-12 px-8 text-base shadow-lg shadow-teal-900/20">
                  Access Provider Dashboard <ArrowRight className="ml-2 h-5 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for Healthcare Scheduling</h2>
            <p className="text-slate-500 text-lg">
              Everything you need to run an efficient medical practice calendar, without the bloat of a full EHR system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-slate-50/50">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4 text-teal-700">
                    <feature.icon size={24} />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Complete Appointment Lifecycle</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Follow a natural clinical scheduling workflow from booking to follow-up.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1. Patient Books", desc: "Patient selects appointment type and time." },
              { step: "2. Check-in", desc: "Patient arrives and enters the waiting room." },
              { step: "3. Visit", desc: "Provider starts the in-person or virtual visit." },
              { step: "4. Follow-up", desc: "Schedule the next appointment with one click." }
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="h-16 w-16 bg-teal-900/50 border border-teal-700 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold text-teal-400">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.step}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
                
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t border-dashed border-slate-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-teal-50 rounded-3xl p-12 text-center max-w-4xl mx-auto border border-teal-100 shadow-sm">
            <h2 className="text-3xl font-bold text-teal-950 mb-4">
              Ready to modernize your scheduling?
            </h2>
            <p className="text-lg text-teal-800/80 mb-8 max-w-xl mx-auto">
              Join leading medical practices that use Schedulrr to provide a premium booking experience for their patients.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white px-8 h-12 text-base shadow-md">
                Try the Provider Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
