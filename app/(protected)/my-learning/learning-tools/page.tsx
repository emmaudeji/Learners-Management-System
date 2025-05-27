'use client';

import React from 'react';
import { BadgeCheck, CalendarClock, ClipboardList, Goal, Group, NotebookText, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const learningTools = [
  {
    id: 'scheduler',
    title: 'Study Scheduler',
    description: 'Set your preferred study times and get timely reminders to stay consistent.',
    icon: <CalendarClock size={24} />,
    actionLabel: 'View Schedule',
    isActive: true,
  },
  {
    id: 'tracker',
    title: 'Progress Tracker',
    description: 'Monitor your learning journey across all courses and modules.',
    icon: <ClipboardList size={24} />,
    actionLabel: 'View Progress',
    isActive: true,
  },
  {
    id: 'goals',
    title: 'Daily Goal Setter',
    description: 'Set daily learning targets and stay motivated with progress updates.',
    icon: <Goal size={24} />,
    actionLabel: 'Set Goal',
    isActive: false,
  },
  {
    id: 'study-groups',
    title: 'Peer Study Groups',
    description: 'Join or create study groups and learn collaboratively with peers.',
    icon: <Group size={24} />,
    actionLabel: 'Explore Groups',
    isActive: false,
  },
  {
    id: 'notes',
    title: 'Note Organizer',
    description: 'Save personal notes and highlights while learning, all in one place.',
    icon: <NotebookText size={24} />,
    actionLabel: 'Add Note',
    isActive: true,
  },
  {
    id: 'cert-planner',
    title: 'Certification Planner',
    description: 'Map out your plan to earn certifications and set milestones.',
    icon: <BadgeCheck size={24} />,
    actionLabel: 'Plan Now',
    isActive: false,
  },
];

const LearningTools = () => {
  return (
    <section className="w-full py-12">
      <div className="padding space-y-6">
        <h2 className="text-2xl font-bold">Learning Tools</h2>
        <p className="text-muted-foreground max-w-xl">
          Customize your learning experience with helpful tools designed to keep you focused, on track, and engaged.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {learningTools.map((tool) => (
            <Card
              key={tool.id}
              className={cn(
                'relative border rounded-md transition-all group hover:shadow-lg',
                tool.isActive ? 'border-blue-600' : 'border-gray-200'
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">{tool.title}</CardTitle>
                <div className={cn('p-2 rounded bg-muted text-blue-600')}>
                  {tool.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                <Button
                  variant={tool.isActive ? 'default' : 'outline'}
                  size="sm"
                  className="w-full"
                >
                  {tool.actionLabel}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningTools;
