import Testimonial from "@/components/Testimonial";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Create Events",
      description: "Easily set up and customize your event types",
    },
    {
      icon: Clock,
      title: "Manage Availability",
      description: "Define your availability to streamline scheduling",
    },
    {
      icon: LinkIcon,
      title: "Custom Links",
      description: "Share your personalized scheduling link",
    },
  ];
  const howItWorks = [
    { step: "Sign Up", description: "Create your free Schedulrr account" },
    {
      step: "Set Availability",
      description: "Define when you're available for meetings",
    },
    {
      step: "Share Your Link",
      description: "Send your scheduling link to clients or colleagues",
    },
    {
      step: "Get Booked",
      description: "Receive confirmations for new appointments automatically",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-between lg:flex-row gap-12 mb-24">
        <div className="lg:w-1/2 ">
          <h1 className="text-7xl font-extrabold pb-6 gradient-title">
            Simplfy Your Scheduling
          </h1>
          <p className="text-gray-600 text-xl mb-10   ">
            Schedulrr helps you manage your time effectively. Create events, set
            your availability, and let others book time with you seamlessly.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg">
              Get started <ArrowRight className="ml-2 h-5 w-4" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="Schedulrr Poster"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold gradient-title mb-12 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
              <Card key={index}>
                <feature.icon color="blue" size={35} className="mx-auto mt-7" />
                <CardHeader>
                  <CardTitle className="mx-auto">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="md:pl-16 pl-26 sm:pl-24">
                  {feature.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold gradient-title mb-12 text-center">
          What our user says
        </h2>
        <Testimonial />
      </div>
      <div className="mb-24">
        <h2 className="text-3xl font-bold gradient-title mb-12 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((item, index) => {
            return (
              <>
                <div key={index} className="text-center">
                  <div className="h-16 w-16 bg-blue-200 mx-auto rounded-full flex items-center justify-center mb-4">
                    <p>{index + 1}</p>
                  </div>

                  <h1 className="font-bold">{item.step}</h1>
                  <p className="font-semibold text-gray-500 flex  items-center justify-center mb-2">
                    {item.description}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Simplify Your Scheduling?
        </h2>
        <p className="text-xl mb-6">
          Join thousands of professionals who trust Schedulrr for efficient time
          management.
        </p>
        <Link href={"/dashboard"}>
          <Button size="lg" variant="secondary" className="text-blue-600">
            Start For Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
