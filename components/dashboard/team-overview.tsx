'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const teamMembers = [
  {
    name: 'Sarah Wilson',
    role: 'Product Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    status: 'active',
    availability: 'Available',
  },
  {
    name: 'Michael Chen',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    status: 'busy',
    availability: 'In a meeting',
  },
  {
    name: 'Alex Kim',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    status: 'offline',
    availability: 'Away until tomorrow',
  },
];

export function TeamOverview() {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Team Overview</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex items-center justify-between space-x-4 p-2 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      member.status === 'active'
                        ? 'bg-green-500'
                        : member.status === 'busy'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {member.name}
                  </p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="ml-2 text-[10px] h-4 px-1">
                            {member.status === 'active' ? 'Online' : member.status === 'busy' ? 'Busy' : 'Offline'}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{member.availability}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}