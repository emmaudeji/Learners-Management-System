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
import { useUserStore } from "@/store/useUserStore";
import { getUrl } from "@/lib/helper";

const navItems = [
  { label: "Dashboard", href: "", icon: LayoutDashboard },
  { label: "Create Course", href: "create-course", icon: ClipboardList },
  { label: "My Courses", href: "my-courses", icon: BookOpen },
  { label: "Subscriptions", href: "subscriptions", icon: Sliders },
  { label: "Payouts", href: "payouts", icon: DollarSign },
  { label: "Reviews", href: "reviews", icon: Star },
  { label: "Profile", href: "profile", icon: UserCircle },
  { label: "Preferences", href: "preferences", icon: Settings },
];

export default function InstructorNav() {
  const pathname = usePathname();
  const {user} = useUserStore()

  return (
    <nav className=" w-80 border-r min-h-[90vh] bg-white p-4 max-md:hidden ">
      <h5 className="text-xl font-semibold mb-6 px-2">Instructor Panel</h5>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={getUrl(item.href)}
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
