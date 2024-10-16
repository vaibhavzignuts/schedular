import { notFound } from "next/navigation";
import { getUserByUsername } from "@/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventCard from "@/components/EventCard";

export async function generateMetadata({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return {
      title: "User Not Found",
      description: "The user you are looking for does not exist.",
    };
  }
  return {
    title: `${user.name}'s Profile`,
    description: `Book and event with ${user.name} , view available public events and schedule`,
  };
}

export default async function UserProfilePage({ params }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 items-center justify-center flex flex-col">
      {" "}
      <Avatar className="h-32 w-32 ">
        <AvatarImage src={user.imageUrl} alt={user.username} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className="py-4 font-bold text-5xl">{user.name}</h1>
      <p className="text-xl text-gray-400 font-semibold">
        Welcome to my Scheduling page. please select an event below to book a
        call with me
      </p>
      {user.events.length === 0 ? (
        <>
          {" "}
          <p className="text-center text-gray-600">
            No public events available.
          </p>
        </>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10 ">
          {" "}
          {user.events.map((event) => {
            return (
              <EventCard
                key={event.id}
                event={event}
                username={params.username}
                isPublic
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
