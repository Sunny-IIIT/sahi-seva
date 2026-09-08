"use client";

import { useState } from "react";
import { Users, FileCheck, MapPin, Search, Bell, AlertTriangle, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'dispatch'>('overview');

  const pendingKYC = [
    { id: 'W-901', name: 'Ramesh Kumar', category: 'Electrician', phone: '+91 9876543210', date: '2 hrs ago' },
    { id: 'W-902', name: 'Anita D.', category: 'Plumber', phone: '+91 8765432109', date: '5 hrs ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-indigo-500" /> SahiSeva Admin
          </h1>
          <p className="text-xs mt-1 text-slate-500">Cooperative Federation HQ</p>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800'}`}
              >
                <AlertTriangle size={18} /> Overview & Disputes
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('kyc')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'kyc' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800'}`}
              >
                <FileCheck size={18} /> KYC Verification
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('dispatch')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dispatch' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-800'}`}
              >
                <MapPin size={18} /> Live Dispatch Radar
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-white px-8 py-5 border-b border-slate-200 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search ID, Worker, Phone..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64" />
            </div>
            <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-10 h-10 bg-indigo-900 rounded-full text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        {/* TAB CONTENT */}
        <div className="flex-1 overflow-auto p-8">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Strip */}
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Total Welfare Fund</p>
                  <h3 className="text-3xl font-black text-slate-900">₹45,290</h3>
                  <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 12% this week</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Active Workers</p>
                  <h3 className="text-3xl font-black text-slate-900">124</h3>
                  <p className="text-xs text-emerald-600 mt-2 font-medium">↑ 4 new today</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Gigs Today</p>
                  <h3 className="text-3xl font-black text-slate-900">89</h3>
                  <p className="text-xs text-slate-500 mt-2 font-medium">In Progress: 12</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Open Disputes</p>
                  <h3 className="text-3xl font-black text-slate-900 text-red-600">3</h3>
                  <p className="text-xs text-red-500 mt-2 font-bold cursor-pointer hover:underline">Requires Attention</p>
                </div>
              </div>

              {/* Disputes Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="font-bold text-slate-900">Urgent Dispute Tickets</h3>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-3 font-bold">Ticket ID</th>
                      <th className="px-6 py-3 font-bold">Booking ID</th>
                      <th className="px-6 py-3 font-bold">Customer</th>
                      <th className="px-6 py-3 font-bold">Status</th>
                      <th className="px-6 py-3 text-right font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-6 py-4 font-mono text-sm">#TCK-992</td>
                      <td className="px-6 py-4 font-mono text-sm text-indigo-600">BKG-4001</td>
                      <td className="px-6 py-4 text-sm font-medium">Vikram S.</td>
                      <td className="px-6 py-4"><span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">OPEN</span></td>
                      <td className="px-6 py-4 text-right"><button className="text-indigo-600 text-sm font-bold hover:underline">Review</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KYC TAB */}
          {activeTab === 'kyc' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Pending Verification</h3>
                <span className="text-sm text-slate-500">2 requests</span>
              </div>
              <ul className="divide-y divide-slate-100">
                {pendingKYC.map((req, i) => (
                  <li key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                        {req.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{req.name} <span className="text-xs font-mono text-slate-400 ml-2">{req.id}</span></h4>
                        <p className="text-sm text-slate-500">{req.category} • {req.phone} • Applied {req.date}</p>
                        <a href="#" className="text-xs text-indigo-600 font-bold mt-1 inline-block hover:underline"><FileCheck size={12} className="inline mr-1" /> View Aadhaar.pdf</a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors text-sm">
                        <XCircle size={16} /> Reject
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors text-sm shadow-md">
                        <CheckCircle2 size={16} /> Approve Profile
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DISPATCH RADAR TAB */}
          {activeTab === 'dispatch' && (
            <div className="h-[600px] bg-slate-200 rounded-xl border border-slate-300 relative overflow-hidden flex items-center justify-center">
               {/* Mock Map Background */}
              <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/5799/3855.png')] bg-cover bg-center opacity-70"></div>
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Live Fleet Metrics</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex justify-between gap-8"><span className="text-slate-500">Online Workers</span><span className="font-bold text-emerald-600">42</span></li>
                  <li className="flex justify-between gap-8"><span className="text-slate-500">Active Jobs</span><span className="font-bold text-indigo-600">12</span></li>
                </ul>
              </div>

              {/* Markers */}
              <div className="absolute top-1/3 left-1/4">
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">IDLE</div>
              </div>
              <div className="absolute bottom-1/3 right-1/3">
                <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">IN_PROGRESS</div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
