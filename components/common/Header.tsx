// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  // TODO: Replace with real auth state
  const isLoggedIn = true;
  const userName = 'John';
  const cartCount = 2;
  const wishlistCount = 4;

  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Logo + Explore */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold text-primary">HubX</Link>
          <div className="relative group">
            <button className="text-sm font-medium flex items-center gap-1 hover:text-primary transition">
              Explore <ChevronDown size={16} />
            </button>
            {/* Dropdown (implement later) */}
            <div className="hidden group-hover:block absolute top-8 left-0 bg-white shadow-lg rounded-md p-4 w-48">
              <Link href="/explore/development" className="block py-1">Development</Link>
              <Link href="/explore/design" className="block py-1">Design</Link>
              <Link href="/explore/business" className="block py-1">Business</Link>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <Input placeholder="Search for courses..." className="w-full max-w-md" />
        </div>

        {/* Right: My Learning + Icons + Auth */}
        <div className="flex items-center gap-4">
          <Link href="/s/my-learning" className={cn("text-sm hover:text-primary transition", pathname === '/s/my-learning' && 'text-primary font-semibold')}>
            My Learning
          </Link>

          {/* Wishlist Icon */}
          <Link href="/wishlist" className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User/Login */}
          {!isLoggedIn ? (
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition">
              <User className="w-5 h-5" />
              <span>{userName}</span>
            </Link>
          ) : (
            <Link href="/auth">
              <Button size="sm" className='flex gap-2 items-center'> <User className="w-5 h-5" />Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
