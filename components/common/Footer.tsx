// components/Footer.tsx

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-tl from-green-900 to-green-700 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">HubX</h2>
          <p className="text-sm text-white/80">
            Empowering learners with expert-led online courses in tech,
            business, and creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/t/onboarding" className="hover:underline">Instructors</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/explore/development" className="hover:underline">Development</Link></li>
            <li><Link href="/explore/design" className="hover:underline">Design</Link></li>
            <li><Link href="/explore/marketing" className="hover:underline">Marketing</Link></li>
            <li><Link href="/explore/business" className="hover:underline">Business</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:underline">Help Center</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Socials */}
          <div className="flex items-center gap-4">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-white" />
            </Link>
            <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
              <Youtube className="w-5 h-5 hover:text-white" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/80">
            © {new Date().getFullYear()} HubX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
