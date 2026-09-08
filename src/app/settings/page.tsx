"use client";

import { motion } from "framer-motion";
import { Settings, Globe, Shield, Bell, Moon, Smartphone } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-10 max-w-3xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <Settings size={24} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
      >
        {[
          { icon: Globe, title: "Language", subtitle: "English (US)", color: "text-blue-500", bg: "bg-blue-50" },
          { icon: Shield, title: "Privacy & Security", subtitle: "Manage your data", color: "text-emerald-500", bg: "bg-emerald-50" },
          { icon: Bell, title: "Notifications", subtitle: "Push & Email", color: "text-amber-500", bg: "bg-amber-50" },
          { icon: Moon, title: "Appearance", subtitle: "Light Mode", color: "text-indigo-500", bg: "bg-indigo-50" },
          { icon: Smartphone, title: "App Info", subtitle: "Version 2.0.1", color: "text-slate-500", bg: "bg-slate-100" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-5 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer last:border-0">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}>
                <item.icon size={24} className={item.color} />
              </div>
              <div>
                <h3 className="font-bold text-slate-700">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.subtitle}</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-slate-200 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
