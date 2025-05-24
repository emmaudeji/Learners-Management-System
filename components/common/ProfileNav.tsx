import { urls } from '@/constants/admin';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/store/useUserStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const navs = [
  { label: 'My Learning', href: '/s/my-learning' },
  { label: 'Messaging', href: '/s/messaging' },
  { label: 'My Cart', href: '/s/cart' },
  { label: 'Wishlists', href: '/s/wishlists' },
];

interface ProfileNavProps {
  triger?: React.ReactNode;
  className?: string;
}

const ProfileNav: React.FC<ProfileNavProps> = ({ triger, className }) => {
  const [open, setOpen] = useState(false);
  const { user, clearUser} = useUserStore();

  const avatarText = user?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

    const {push} = useRouter()

  const handleLogout = async () => {
    // TODO: Implement logout logic
     const success = await clearUser();
      if (success) push(urls.basePath);

  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        // Close only if focus leaves the container and its descendants
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
      aria-haspopup="true"
      aria-expanded={open}
    >
      {triger ? (
        triger
      ) : (
        <Link
          href="/s/my-learning"
          className={cn(
            'text-sm hover:text-primary transition h-10 w-10 rounded-full bg-primary overflow-clip flex items-center justify-center',
            className
          )}
          aria-label="User Profile"
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={`user's avatar`}
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

      {open && (
        <div
          className="absolute right-0 mt-2 z-50 w-72 bg-white dark:bg-background border divide-y rounded-md shadow-xl p-4 space-y-3"
          role="menu"
          aria-label="User menu"
        >
          <div className="flex gap-3 items-center pb-4">
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

          <nav className="pb-4 w-full" role="none">
            <ul className="flex flex-col space-y-0.5" role="menu">
              {navs.map(({ label, href }) => (
                <li key={href} role="none">
                  <Link
                    href={href}
                    role="menuitem"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="w-full flex flex-col gap-0.5">
            {user ? <Link 
              type="button"
              href={`/profile`}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              My Account
            </Link > : null}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileNav;
