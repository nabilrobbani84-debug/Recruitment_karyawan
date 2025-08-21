// app/dashboard/layout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';  // Correct import for Link

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li><Link href="/dashboard/jobs">Jobs</Link></li>
            <li><Link href="/dashboard/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
