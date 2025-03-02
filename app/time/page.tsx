'use client';

import { DashboardShell } from '@/components/dashboard/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeData {
  name: string;
  hours: number;
}

interface ProjectTimeData {
  project: string;
  hours: number;
}

const timeData: TimeData[] = [
  { name: 'Mon', hours: 7.5 },
  { name: 'Tue', hours: 8 },
  { name: 'Wed', hours: 6.5 },
  { name: 'Thu', hours: 8.5 },
  { name: 'Fri', hours: 7 },
  { name: 'Sat', hours: 4 },
  { name: 'Sun', hours: 2 },
];

const projectTimeData: ProjectTimeData[] = [
  { project: 'Website Redesign', hours: 24 },
  { project: 'Mobile App', hours: 18 },
  { project: 'Marketing Campaign', hours: 12 },
];

export default function TimePage() {
  return (
    <DashboardShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Time Tracking</h1>
        <div className="flex gap-4">
          <Select defaultValue="week">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectTimeData.map((project) => (
                <div key={project.project}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{project.project}</span>
                    <span>{project.hours}h</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(project.hours / Math.max(...projectTimeData.map(p => p.hours))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="range"
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}