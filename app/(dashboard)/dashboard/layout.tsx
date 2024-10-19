"use client"
// import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

// export const metadata: Metadata = {
//   title: 'Dashboard',
//   description: 'Dashboard example using Next.js 14',
// };

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-100">{children}</div>
    </SessionProvider>
  );
}
