'use client';

import { DashboardShell } from '@/components/dashboard/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Mail, Phone, MapPin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Wilson',
    role: 'Product Manager',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    projects: 8,
    tasks: 24,
  },
  {
    name: 'Michael Chen',
    role: 'Senior Developer',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    projects: 6,
    tasks: 18,
  },
  {
    name: 'Alex Kim',
    role: 'UI/UX Designer',
    email: 'alex.kim@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    projects: 5,
    tasks: 15,
  },
];

export default function TeamPage() {
  return (
    <DashboardShell>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input className="pl-10 w-[300px]" placeholder="Search team members..." />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.name}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="flex justify-between mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{member.projects}</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{member.tasks}</p>
                  <p className="text-sm text-muted-foreground">Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}