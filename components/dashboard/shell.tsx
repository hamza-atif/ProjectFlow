'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  Menu,
  X,
  Clock,
  PieChart,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Calendar, label: 'Projects', href: '/projects' },
  { icon: Clock, label: 'Time Tracking', href: '/time' },
  { icon: PieChart, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Ensure hydration mismatch is avoided
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle sidebar toggle based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-card transition-transform duration-200 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ProjectFlow</h1>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-2 transition-all hover:translate-x-1"
                asChild
              >
                <div>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Button>
            </Link>
          ))}
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive/90 transition-all hover:translate-x-1">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
        
        {/* Quick Stats */}
        {mounted && (
          <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-card/50 backdrop-blur-sm">
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between mb-2">
                <span>Active Projects</span>
                <span className="font-medium text-foreground">3</span>
              </div>
              <div className="flex justify-between">
                <span>Today's Tasks</span>
                <span className="font-medium text-foreground">8</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div
        className={cn(
          'min-h-screen transition-all duration-200 ease-in-out',
          sidebarOpen ? 'pl-64' : 'pl-0'
        )}
      >
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex h-16 items-center gap-4 px-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className={cn('md:hidden', sidebarOpen && 'hidden')}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Global Search */}
            <div className="hidden md:flex relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input className="pl-10 w-[300px] bg-background" placeholder="Search..." />
            </div>
            
            <div className="ml-auto flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <DropdownMenuItem key={i} className="cursor-pointer py-3">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">New comment on Website Redesign</p>
                          <p className="text-sm text-muted-foreground">Sarah Wilson commented 10 minutes ago</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Theme Toggle */}
              {mounted && <ThemeToggle />}
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="hidden md:flex">New Project</Button>
              <Button className="hidden md:flex">Start Timer</Button>
            </div>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        
        {/* Footer */}
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ProjectFlow. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}