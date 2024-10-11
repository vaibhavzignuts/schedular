import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Usermenu from "./User-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <nav className="flex items-center justify-between py-2 px-4 mx-auto shadow-md border-b-2">
      <Link href={"/"} className="flex items-center">
        <Image
          src="/logo.png"
          height="60"
          width="150"
          alt="schedular"
          className="h-16 w-auto"
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/events?create=true">
          <Button className="gap-2">
            <PenBox size={18} />
            Create Event
          </Button>
        </Link>
        <Link href={"/sign-in"}>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Usermenu />
          </SignedIn>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
