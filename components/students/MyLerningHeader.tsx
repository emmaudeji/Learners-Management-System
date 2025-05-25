'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navs = [
  { label: 'All Courses', link: '/s/my-learning' },
  { label: 'My Lists', link: '/s/my-learning/lists' },
  { label: 'Wishlists', link: '/s/my-learning/wishlists' },
  { label: 'Certifications', link: '/s/my-learning/certifications' },
  { label: 'Archived', link: '/s/my-learning/archived' },
  { label: 'Learning Tools', link: '/s/my-learning/learning-tools' },
];

const MyLearningHeader = () => {
  const pathname = usePathname();

  return (
    <section className="w-full pt-12 bg-primary   text-white">
      <div className="padding space-y-6">
        <h2 className="text-3xl font-bold">My Learning</h2>

        <nav className="flex flex-wrap gap-4">
          {navs.map((nav) => (
            <Link
              key={nav.link}
              href={nav.link}
              className={cn(
                'px-4 py-2 rounded-t-md  text-sm font-medium transition-colors',
                pathname === nav.link
                  ? 'bg-white text-primary'
                  : 'hover:bg-white/10'
              )}
            >
              {nav.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default MyLearningHeader;
