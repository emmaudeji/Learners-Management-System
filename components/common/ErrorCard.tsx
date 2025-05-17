'use client';

import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorCardProps {
  message: string;
}

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <Card className="bg-red-50 border-red-200 text-red-800 p-3">
      <CardContent className="flex items-start gap-2 ">
        <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
        <div>
          {/* <h4 className="font-semibold text-sm">An error occurred</h4> */}
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
