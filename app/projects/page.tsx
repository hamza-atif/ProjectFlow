'use client';

import { DashboardShell } from '@/components/dashboard/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, Clock, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TeamMember {
  name: string;
  avatar: string;
}

interface Project {
  name: string;
  description: string;
  status: 'In Progress' | 'Planning' | 'Completed';
  progress: number;
  dueDate: string;
  team: TeamMember[];
  tasks: {
    completed: number;
    total: number;
  };
  priority: 'High' | 'Medium' | 'Low';
}

const projects: Project[] = [
  {
    name: 'Website Redesign',
    description: 'Redesign and rebuild the main company website with modern technologies',
    status: 'In Progress',
    progress: 65,
    dueDate: '2024-05-15',
    team: [
      {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      },
    ],
    tasks: { completed: 24, total: 36 },
    priority: 'High',
  },
  {
    name: 'Mobile App Development',
    description: 'Develop a new mobile app for customer engagement',
    status: 'Planning',
    progress: 25,
    dueDate: '2024-06-30',
    team: [
      {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
      },
    ],
    tasks: { completed: 8, total: 42 },
    priority: 'Medium',
  },
  {
    name: 'Marketing Campaign',
    description: 'Q2 Digital Marketing Campaign for product launch',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-04-01',
    team: [
      {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
    ],
    tasks: { completed: 18, total: 18 },
    priority: 'Low',
  },
];

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input className="pl-10 w-[300px]" placeholder="Search projects..." />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.name}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <Badge
                  variant={
                    project.status === 'Completed'
                      ? 'default'
                      : project.status === 'In Progress'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Tasks: {project.tasks.completed}/{project.tasks.total}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <Avatar key={member.name} className="border-2 border-background">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}