import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Activity, Users, CalendarX, TrendingUp, Clock } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Scheduling Insights</h1>
        <p className="text-slate-500 mt-1">Key metrics and operational data for your practice.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-600">Appointments (30d)</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">142</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <TrendingUp className="mr-1 h-3 w-3" /> +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-600">New Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">28</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              19% of total volume
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-600">Cancellation Rate</CardTitle>
            <CalendarX className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">4.2%</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <TrendingUp className="mr-1 h-3 w-3 rotate-180" /> -1.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-600">No-show Rate</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">1.8%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Industry avg: 5-7%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts / Data Viz Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Appointment Volume (Last 7 Days)</CardTitle>
            <CardDescription>Daily completed vs scheduled appointments.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 border-t border-slate-50 bg-slate-50/50">
            {/* Placeholder for actual chart */}
            <div className="flex items-end gap-4 h-40 w-full px-8 opacity-70">
              {[4, 6, 8, 5, 9, 3, 2].map((val, i) => (
                <div key={i} className="flex-1 bg-teal-500 rounded-t-sm" style={{ height: `${val * 10}%` }}></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Appointment Types</CardTitle>
            <CardDescription>Distribution of visit reasons.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64 border-t border-slate-50 bg-slate-50/50">
            {/* Placeholder for actual chart */}
            <div className="w-full max-w-[250px] space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>Follow-up Visit</span>
                  <span>45%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[45%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>New Patient</span>
                  <span>30%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[30%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>Telehealth</span>
                  <span>15%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[15%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>Other</span>
                  <span>10%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 w-[10%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Table Section */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Recent Cancellations & No-shows</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Notice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">Robert Taylor</td>
                  <td className="px-6 py-4 text-slate-600">Sep 7, 2026</td>
                  <td className="px-6 py-4 text-slate-600">Medication Follow-up</td>
                  <td className="px-6 py-4"><span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">Cancelled</span></td>
                  <td className="px-6 py-4 text-slate-600">24 hrs</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">David Clark</td>
                  <td className="px-6 py-4 text-slate-600">Sep 5, 2026</td>
                  <td className="px-6 py-4 text-slate-600">Annual Wellness</td>
                  <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">No Show</span></td>
                  <td className="px-6 py-4 text-slate-600">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
