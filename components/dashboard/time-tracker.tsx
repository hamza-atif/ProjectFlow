'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, StopCircle, Clock, RotateCcw } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TimeTracker() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [project, setProject] = useState('');
  const [recentSessions, setRecentSessions] = useState([
    { project: 'Website Redesign', duration: 3600 },
    { project: 'Mobile App', duration: 1800 },
  ]);

  useEffect(() => {
    let timerId = null;
    
    if (isRunning) {
      // Using a simple setTimeout-based approach instead of setInterval
      // to avoid potential issues with the timer callback
      const tick = () => {
        setTime(prevTime => prevTime + 1);
        timerId = setTimeout(tick, 1000);
      };
      
      timerId = setTimeout(tick, 1000);
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    if (time > 0 && project) {
      // Save the session
      setRecentSessions(prev => [
        { project, duration: time },
        ...prev.slice(0, 2) // Keep only the 3 most recent sessions
      ]);
    }
    
    setIsRunning(false);
    setTime(0);
    setProject('');
  };

  const handleReset = () => {
    if (!isRunning) {
      setTime(0);
    }
  };

  const handleProjectChange = (value) => {
    setProject(value);
  };

  const resumeSession = (sessionProject, sessionDuration) => {
    setProject(sessionProject);
    setTime(sessionDuration);
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Project Selection */}
          <div className="w-full">
            <Select value={project} onValueChange={handleProjectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Marketing Campaign">Marketing Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Timer Display */}
          <div className="text-4xl font-bold font-mono text-center py-4 bg-muted/30 rounded-md">
            {formatDuration(time)}
          </div>
          
          {/* Controls */}
          <div className="flex justify-center space-x-2">
            {!isRunning ? (
              <Button 
                onClick={handleStart} 
                className="w-24 transition-all hover:scale-105"
                disabled={!project}
              >
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            ) : (
              <Button 
                onClick={handlePause} 
                variant="secondary" 
                className="w-24 transition-all hover:scale-105"
              >
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
            )}
            <Button
              onClick={handleStop}
              variant="destructive"
              disabled={time === 0}
              className="w-24 transition-all hover:scale-105"
            >
              <StopCircle className="mr-2 h-4 w-4" />
              Stop
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={time === 0 || isRunning}
              className="w-24 transition-all hover:scale-105"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
          
          {/* Recent Sessions */}
          {recentSessions.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Recent Sessions</h4>
              <div className="space-y-2">
                {recentSessions.map((session, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-2 bg-muted/30 rounded-md text-sm hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => resumeSession(session.project, session.duration)}
                  >
                    <span>{session.project}</span>
                    <span className="font-mono">{formatDuration(session.duration)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}