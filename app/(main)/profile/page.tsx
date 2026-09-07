"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, User, Stethoscope, MapPin, Link as LinkIcon, Languages } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Provider Profile</h1>
        <p className="text-slate-500 mt-1">Manage your professional information displayed to patients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="border-slate-200 shadow-sm text-center pt-6">
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-sm mb-4">
                <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                <AvatarFallback className="text-4xl bg-teal-100 text-teal-800 font-bold">
                  {user?.firstName?.charAt(0) || "D"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-slate-900">Dr. {user?.fullName || "Emily Carter"}</h2>
              <p className="text-teal-700 font-medium">Family Medicine</p>
              
              <div className="w-full mt-6 space-y-3 text-sm text-left border-t border-slate-100 pt-4">
                <div className="flex items-center text-slate-600">
                  <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                  Primary Care Center, NY
                </div>
                <div className="flex items-center text-slate-600">
                  <Languages className="h-4 w-4 mr-2 text-slate-400" />
                  English, Spanish
                </div>
                <div className="flex items-center text-slate-600">
                  <LinkIcon className="h-4 w-4 mr-2 text-slate-400" />
                  schedulrr.com/{user?.username || "demo"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-slate-400" /> Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">First Name</label>
                  <Input defaultValue={user?.firstName || ""} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Last Name</label>
                  <Input defaultValue={user?.lastName || ""} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <Input defaultValue={user?.primaryEmailAddress?.emailAddress || ""} disabled className="bg-slate-50 text-slate-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Public Booking Link Username</label>
                <Input defaultValue={user?.username || ""} disabled className="bg-slate-50 text-slate-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center">
                <Stethoscope className="mr-2 h-5 w-5 text-slate-400" /> Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Specialty</label>
                  <Input defaultValue="Family Medicine" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Practice Name</label>
                  <Input defaultValue="Primary Care Center" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Professional Bio</label>
                <Textarea 
                  defaultValue="Dr. Carter is a board-certified Family Medicine physician with over 10 years of experience providing comprehensive care for patients of all ages."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm px-8">
              <Save className="mr-2 h-4 w-4" /> Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
