'use client';

import React from 'react';
import { courses } from '@/data';
import EmptyList from '@/components/common/EmptyList';
import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Certifications = () => {
  // Simulated earned certifications (empty = no certs yet)
  const earnedCertifications = courses.slice(0, 0); // Change to slice(0, 2) to simulate earned certs

  return (
    <section className="w-full py-12">
      <div className="padding space-y-6">
        <h2 className="text-2xl font-bold">Your Certifications</h2>

        {earnedCertifications.length === 0 ? (
          <EmptyList
            heading="No Certifications Yet"
            text="Complete a course to earn a personalized certificate. Your certificates will appear here once earned."
            icon={<BadgeCheck size={60} className="text-purple-300" />}
            CTA={
              <Link href="/all-courses">
                <Button className="mt-4">Start Learning</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedCertifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-md border shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="rounded-t-md w-full h-40 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified by LearnPro &mdash; {cert.instructor}
                  </p>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <BadgeCheck size={16} /> Certificate Earned
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
