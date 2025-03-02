'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    status: 'In Progress',
    progress: 65,
    dueDate: '2024-05-15',
    team: [
      { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' },
    ],
    priority: 'High',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    status: 'Planning',
    progress: 25,
    dueDate: '2024-06-30',
    team: [
      { name: 'Alex Kim', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' },
      { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    ],
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    status: 'Completed',
    progress: 100,
    dueDate: '2024-04-01',
    team: [
      { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' },
    ],
    priority: 'Low',
  },
];

export function ProjectList() {
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'progress') {
      return sortOrder === 'asc' 
        ? a.progress - b.progress
        : b.progress - a.progress;
    } else if (sortBy === 'dueDate') {
      return sortOrder === 'asc' 
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  });

  const getSortIndicator = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Card className="mt-6 transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Overview of ongoing projects and their status</CardDescription>
          </div>
          <Button size="sm">View All Projects</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('name')}
              >
                Project{getSortIndicator('name')}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('progress')}
              >
                Progress{getSortIndicator('progress')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleSort('dueDate')}
              >
                Due Date{getSortIndicator('dueDate')}
              </TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
              <TableRow key={project.id} className="group">
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{project.progress}%</span>
                    </div>
                    <Progress 
                      value={project.progress} 
                      className="h-2" 
                      indicatorClassName={
                        project.progress === 100 
                          ? "bg-green-500" 
                          : project.progress > 50 
                          ? "bg-blue-500" 
                          : "bg-amber-500"
                      }
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <span className={
                    new Date(project.dueDate) < new Date() && project.status !== 'Completed'
                      ? "text-destructive font-medium"
                      : ""
                  }>
                    {new Date(project.dueDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <Avatar key={member.name} className="border-2 border-background transition-transform group-hover:translate-x-1">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Assign Team</DropdownMenuItem>
                        <DropdownMenuItem>View Tasks</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}