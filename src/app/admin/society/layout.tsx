import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Settings, LogOut, Building2 } from 'lucide-react';

export default function SocietyAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-full flex flex-col">
          
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-indigo-700 mb-1">
              <Building2 size={24} />
              <span className="font-bold text-xl tracking-tight">SahiSeva</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">COOPERATIVE ADMIN PORTAL</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link 
              href="/admin/society" 
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <LayoutDashboard size={18} />
              Overview
            </Link>

            <Link 
              href="#" 
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed"
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 w-full transition-colors">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
          
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
