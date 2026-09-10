"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Search, Briefcase, User, Settings, ShieldCheck, PlusCircle, Award, HeartHandshake, Globe, LogIn, LogOut, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage, Lang } from '@/lib/i18n';
import { createClient } from '@/lib/supabase/client';

const CUSTOMER_NAV = [
  { label: 'nav.home', href: '/', icon: Home },
  { label: 'nav.book', href: '/customer/book', icon: PlusCircle },
  { label: 'nav.profile', href: '/profile', icon: User },
];

const WORKER_NAV = [
  { label: 'nav.dashboard', href: '/worker/dashboard', icon: Briefcase },
  { label: 'nav.benefits', href: '/worker/benefits', icon: HeartHandshake },
  { label: 'nav.verification', href: '/worker/training', icon: Award },
  { label: 'nav.profile', href: '/profile', icon: User },
];

export function Navigation() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    fetchUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  // Conditionally render nav items based on the active route
  const isWorkerRoute = pathname?.startsWith('/worker');
  const NAV_ITEMS = isWorkerRoute ? WORKER_NAV : CUSTOMER_NAV;

  return (
    <>
      {/* 📱 MOBILE BOTTOM BAR (Hidden on md: screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[calc(60px+env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-slate-200 z-50 flex items-start justify-around px-2 pt-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] select-none">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${
                isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
                  />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {t(item.label)}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 💻 DESKTOP LEFT SIDEBAR (Hidden on mobile) */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 w-64 h-[100dvh] bg-white border-r border-slate-200 z-50 px-6 py-8 select-none">
        <Link href="/" className="flex items-center gap-2 mb-10 text-indigo-700 hover:opacity-80 transition-opacity">
          <ShieldCheck size={32} />
          <h1 className="text-2xl font-black tracking-tight">SahiSeva</h1>
        </Link>
        
        <nav className="flex flex-col gap-3 flex-1 overflow-y-auto hide-scrollbar pb-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm border border-indigo-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                {t(item.label)}
              </Link>
            );
          })}

          <div className="my-4 border-t border-slate-100" />
          
          {/* Join As Worker (only show if not already in worker mode) */}
          {!isWorkerRoute && (
            <Link
              href="/worker/register"
              className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors"
            >
              <UserPlus size={20} className="text-slate-400" />
              {t("nav.join")}
            </Link>
          )}

          {/* Language Selector */}
          <div className="flex items-center gap-4 px-4 py-3 text-slate-500 font-medium rounded-xl">
            <Globe size={20} className="text-slate-400" />
            <select 
              value={lang} 
              onChange={e => setLang(e.target.value as Lang)}
              className="bg-transparent outline-none w-full cursor-pointer text-slate-700 font-bold"
            >
              <option value="EN">English</option>
              <option value="HI">Hindi</option>
              <option value="GU">Gujarati</option>
            </select>
          </div>
        </nav>

        {/* Desktop Footer Actions (Auth/Settings) */}
        <div className="mt-auto border-t border-slate-100 pt-6 flex flex-col gap-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-700 font-medium rounded-xl transition-colors w-full text-left"
            >
              <LogOut size={20} />
              Logout ({user.email?.split('@')[0] || 'User'})
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors w-full text-center shadow-md shadow-indigo-200"
            >
              <LogIn size={20} />
              {t("nav.signin")}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
