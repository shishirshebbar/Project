import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="px-6 py-4 bg-white shadow-md border-b border-gray-200 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Link href="/Dashboard" className="flex items-center space-x-3">
          <Image
            src="/logo1.jpg"
            alt="Cognify Logo"
            width={50}
            height={50}
            className="rounded-md shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors cursor-pointer">
              Cognify
            </h2>
            <p className="text-sm text-gray-500">
              Smarter learning starts with smarter videos
            </p>
          </div>
        </Link>
      </div>

      {/* Right Section */}
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
