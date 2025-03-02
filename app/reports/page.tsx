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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface TimeData {
  name: string;
  hours: number;
}

interface ProjectData {
  name: string;
  value: number;
}

interface ProjectStatusData {
  name: string;
  completed: number;
  remaining: number;
}

interface TeamProductivityData {
  name: string;
  tasks: number;
  hours: number;
}

const timeData: TimeData[] = [
  { name: 'Week 1', hours: 32 },
  { name: 'Week 2', hours: 40 },
  { name: 'Week 3', hours: 45 },
  { name: 'Week 4', hours: 38 },
];

const projectData: ProjectData[] = [
  { name: 'Website Redesign', value: 40 },
  { name: 'Mobile App', value: 30 },
  { name: 'Marketing Campaign', value: 20 },
  { name: 'Internal Tools', value: 10 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function ReportsPage() {
  return (
    <DashboardShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex gap-4">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      <Tabs defaultValue="time" className="space-y-6">
        <TabsList>
          <TabsTrigger value="time">Time Reports</TabsTrigger>
          <TabsTrigger value="projects">Project Reports</TabsTrigger>
          <TabsTrigger value="team">Team Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="time">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Time Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="hsl(var(--chart-1))" />
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
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={[
                      { name: 'Website Redesign', completed: 65, remaining: 35 },
                      { name: 'Mobile App', completed: 25, remaining: 75 },
                      { name: 'Marketing Campaign', completed: 100, remaining: 0 },
                      { name: 'Internal Tools', completed: 45, remaining: 55 },
                    ] as ProjectStatusData[]}
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="hsl(var(--chart-2))" name="Completed %" />
                    <Bar dataKey="remaining" stackId="a" fill="hsl(var(--muted))" name="Remaining %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Productivity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Sarah Wilson', tasks: 24, hours: 38 },
                      { name: 'Michael Chen', tasks: 18, hours: 42 },
                      { name: 'Alex Kim', tasks: 15, hours: 35 },
                    ] as TeamProductivityData[]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-3))" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="tasks" fill="hsl(var(--chart-1))" name="Tasks Completed" />
                    <Bar yAxisId="right" dataKey="hours" fill="hsl(var(--chart-3))" name="Hours Worked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}