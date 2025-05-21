// components/instructor/InstructorNav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  UserCircle,
  Settings,
  DollarSign,
  Star,
  LayoutDashboard,
  ClipboardList,
  Wallet,
  Sliders,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/t", icon: LayoutDashboard },
  { label: "Create Course", href: "/t/create-course", icon: ClipboardList },
  { label: "My Courses", href: "/t/my-courses", icon: BookOpen },
  { label: "Subscriptions", href: "/t/subscriptions", icon: Sliders },
  { label: "Payouts", href: "/t/payouts", icon: DollarSign },
  { label: "Reviews", href: "/t/reviews", icon: Star },
  { label: "Profile", href: "/t/profile", icon: UserCircle },
  { label: "Preferences", href: "/t/preferences", icon: Settings },
];

export default function InstructorNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full lg:w-64 border-r min-h-[90vh] bg-white p-4 max-md:hidden ">
      <h2 className="text-xl font-semibold mb-6 px-2">Instructor Panel</h2>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-muted",
                  isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
