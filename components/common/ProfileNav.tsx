'use client';

import { urls } from '@/constants/admin';
import { useGlobal } from '@/context/RootContext';
import { getStudentUrl, getUrl } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface ProfileNavProps {
  triger?: React.ReactNode;
  className?: string;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ triger, className }) => {
  const { user, clearUser,  } = useUserStore();
  const { push } = useRouter();
  const {setOpenNav, openNav} = useGlobal();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navs = [
    { label: 'My Learning', href: getStudentUrl('') },
    {
      label: 'My Space',
      href: getUrl(''),
      isVicible: user?.role.includes('TEACHER, ADMIN, SUPERADMIN'),
    },
    { label: 'Messaging', href: getStudentUrl('messaging') },
    { label: 'My Cart', href: '/cart' },
    { label: 'Wishlists', href: getStudentUrl('wishlists') },
  ];

  const avatarText = user?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenNav('profileNav');
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenNav('');
    }, 1000); // delay hiding by 200ms
  };

  const handleLogout = async () => {
    const success = await clearUser();
    if (success) push(urls.basePath);
  };

  const dashboardUrl = user?.role.includes('STUDENT')
    ? getStudentUrl('') : getUrl('');

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {triger ? (
        triger
      ) : (
        <Link
          href={dashboardUrl}
          className={cn(
            'text-sm hover:text-primary transition h-10 w-10 rounded-full bg-primary overflow-clip flex items-center justify-center',
            className
          )}
          aria-label="User Profile"
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="user avatar"
              height={100}
              width={100}
              className="object-cover text-xs w-full h-full overflow-clip rounded-full"
            />
          ) : (
            <div className="bg-primary text-white h-10 w-10 uppercase text-xl font-bold rounded-full flex items-center justify-center">
              {avatarText || 'U'}
            </div>
          )}
        </Link>
      )}

       <div
          className={cn(
            'absolute right-0 mt-2 z-50 w-72 bg-white dark:bg-background border divide-y rounded-md shadow-xl p-4 space-y-3',
            'transition-all duration-300 ease-out',
            openNav==='profileNav' ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-2 scale-95 pointer-events-none',
          )}
          role="menu"
        >
          <div
            onClick={() => push(dashboardUrl)}
            className="flex gap-3 items-center pb-4 cursor-pointer"
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.fullName}'s avatar`}
                height={80}
                width={80}
                className="object-cover w-20 h-20 rounded-full shrink-0 overflow-clip"
              />
            ) : (
              <div className="bg-primary text-white h-20 w-20 shrink-0 uppercase text-xl font-bold rounded-full flex items-center justify-center">
                {avatarText || 'U'}
              </div>
            )}

            <div className="flex-1">
              <h6 className="font-semibold text-lg">{user?.fullName || 'User'}</h6>
              <Link
                href={`mailto:${user?.email}`}
                className="hover:underline duration-300 text-gray-500 text-sm break-all"
              >
                {user?.email || 'no-email@example.com'}
              </Link>
            </div>
          </div>

          <nav className="pb-4 w-full">
            <ul className="flex flex-col space-y-0.5">
              {navs.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-full flex flex-col gap-0.5">
            {user && (
              <Link
                href={
                  user.role === 'STUDENT'
                    ? getStudentUrl('profile')
                    : getUrl('profile')
                }
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                My Account
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProfileNav;
