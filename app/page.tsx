'use client';

import { DashboardShell } from '@/components/dashboard/shell';
import { ProjectList } from '@/components/dashboard/project-list';
import { TeamOverview } from '@/components/dashboard/team-overview';
import { TimeTracker } from '@/components/dashboard/time-tracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Calendar, Clock, Users, CheckSquare, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { 
      title: 'Active Projects', 
      value: '3', 
      icon: Calendar, 
      change: '+1 this week',
      color: 'bg-blue-100 dark:bg-blue-900/20',
      iconColor: 'text-blue-500'
    },
    { 
      title: 'Team Members', 
      value: '8', 
      icon: Users, 
      change: 'No change',
      color: 'bg-purple-100 dark:bg-purple-900/20',
      iconColor: 'text-purple-500'
    },
    { 
      title: 'Tasks Completed', 
      value: '24', 
      icon: CheckSquare, 
      change: '+8 this week',
      color: 'bg-green-100 dark:bg-green-900/20',
      iconColor: 'text-green-500'
    },
    { 
      title: 'Overdue Tasks', 
      value: '3', 
      icon: AlertTriangle, 
      change: '-2 this week',
      color: 'bg-amber-100 dark:bg-amber-900/20',
      iconColor: 'text-amber-500'
    }
  ];

  const taskData = [
    { name: 'Completed', value: 24 },
    { name: 'In Progress', value: 12 },
    { name: 'Not Started', value: 8 },
  ];

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TeamOverview />
        <TimeTracker />
        
        {/* Task Distribution */}
        {mounted && (
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2 h-5 w-5" />
                Task Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} tasks`, name]}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: '1px solid hsl(var(--border))',
                        backgroundColor: 'hsl(var(--background))'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-2">
                {taskData.map((entry, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs">{entry.name}</span>
                    </div>
                    <p className="font-medium">{entry.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <ProjectList />
      
      {/* Quick Actions */}
      <Card className="mt-6 transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Calendar className="h-5 w-5 mb-2" />
              <span>New Project</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <CheckSquare className="h-5 w-5 mb-2" />
              <span>Add Task</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Clock className="h-5 w-5 mb-2" />
              <span>Time Report</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
              <Users className="h-5 w-5 mb-2" />
              <span>Team Meeting</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}