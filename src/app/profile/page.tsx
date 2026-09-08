"use client";

import { User, Mail, Phone, MapPin, ShieldCheck, ChevronRight, Settings, LogOut, Wallet, FileText, Bell, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-10 max-w-4xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Profile</h1>
        <button className="p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors">
          <Settings size={20} className="text-slate-600" />
        </button>
      </div>

      {/* User Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="relative">
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <User size={40} strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
            <ShieldCheck size={16} />
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Sunny Singh</h2>
          <p className="text-slate-500 font-medium">Customer Account</p>
          
          <div className="mt-4 flex flex-col md:flex-row gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone size={16} className="text-slate-400" />
              <span>+91 98765 43210</span>
            </div>
            <div className="hidden md:block text-slate-300">•</div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail size={16} className="text-slate-400" />
              <span>sunny.singh@example.com</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats/Quick Links Row */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-indigo-600 text-white p-5 rounded-2xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]">
          <Wallet size={24} className="mb-2 opacity-80" />
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Sahi Wallet</p>
          <p className="text-2xl font-black">₹450</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-slate-800 flex flex-col justify-center">
          <FileText size={24} className="mb-2 text-indigo-500" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Bookings</p>
          <p className="text-2xl font-black">12</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-slate-800 flex flex-col justify-center">
          <ShieldCheck size={24} className="mb-2 text-emerald-500" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Trust Score</p>
          <p className="text-2xl font-black">100/100</p>
        </div>
      </motion.div>

      {/* Menu List */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mb-8"
      >
        {[
          { icon: Briefcase, label: "Switch to Worker Mode", href: "/worker/dashboard", color: "text-indigo-600", bg: "bg-indigo-50" },
          { icon: MapPin, label: "Saved Addresses", href: "#", color: "text-blue-500", bg: "bg-blue-50" },
          { icon: FileText, label: "Booking History", href: "#", color: "text-purple-500", bg: "bg-purple-50" },
          { icon: Wallet, label: "Payment Methods", href: "#", color: "text-emerald-500", bg: "bg-emerald-50" },
          { icon: Bell, label: "Notifications", href: "#", color: "text-amber-500", bg: "bg-amber-50" },
        ].map((item, i) => (
          <Link key={i} href={item.href} className="flex items-center justify-between p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}>
                <item.icon size={20} className={item.color} />
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </Link>
        ))}
      </motion.div>

      {/* Logout */}
      <button className="w-full bg-red-50 text-red-600 font-bold p-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
        <LogOut size={20} />
        Log Out
      </button>

    </div>
  );
}
