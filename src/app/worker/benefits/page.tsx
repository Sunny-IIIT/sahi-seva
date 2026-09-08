"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  HeartPulse, 
  Wallet, 
  BookOpen, 
  Vote, 
  Landmark, 
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  }
};

export default function WorkerBenefitsDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans sm:py-8">
      {/* Mobile-first constraint container */}
      <div className="max-w-md mx-auto bg-slate-50 min-h-screen sm:min-h-[850px] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col border sm:border-slate-300">
        
        {/* Header Section */}
        <header className="bg-slate-900 text-white px-6 pt-12 pb-8 rounded-b-3xl shadow-md relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Welfare & Benefits</h1>
            <p className="text-slate-400 text-sm mt-1">SahiSeva Cooperative</p>
          </div>
          <Link href="/worker/dashboard" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} className="text-slate-300" />
          </Link>
        </header>

        <main className="flex-1 px-5 -mt-4 relative z-20 space-y-5 pb-10 overflow-y-auto">
          
          {/* 1. Personal Contribution Card (Hero) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg shadow-emerald-900/20 relative overflow-hidden"
          >
            {/* Background decorative rings */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal-900/30 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <p className="text-emerald-50 text-[11px] font-bold uppercase tracking-wider mb-2 opacity-90">
                Your Total Welfare Contribution
              </p>
              <h2 className="text-4xl font-extrabold mb-3 tracking-tight drop-shadow-sm">₹12,450</h2>
              <div className="flex items-center gap-2 text-emerald-50 text-sm font-medium bg-black/10 w-fit px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                <ShieldCheck size={16} className="text-emerald-200" />
                <p>Securing your future, one job at a time.</p>
              </div>
            </div>
          </motion.div>

          {/* 2. Society Master Pool */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between relative overflow-hidden group hover:border-indigo-200 transition-colors"
          >
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Landmark size={14} className="text-indigo-500"/>
                Plumber Society Fund (Surat)
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">₹8,45,000</h3>
            </div>
            <div className="bg-indigo-50 p-2.5 rounded-full border border-indigo-100 relative z-10">
              <TrendingUp className="text-indigo-600" size={20} />
            </div>
          </motion.div>

          {/* 3. Sahkar Credit Score & Vesting Tracker */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white border border-slate-800"
          >
            <div className="flex justify-between items-end mb-4">
              <div>
                <h4 className="font-bold text-lg text-slate-50">Sahkar Credit Score</h4>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Zero-Interest Micro-Loan Vesting</p>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-1 rounded-md text-sm border border-emerald-400/20">
                16 / 20 Jobs
              </span>
            </div>
            
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-4 border border-slate-700/50 shadow-inner">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '80%' }} 
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full relative"
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20 mix-blend-overlay"></div>
              </motion.div>
            </div>
            
            <p className="text-[13px] text-slate-300 font-medium">
              Complete <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded">4 more jobs</strong> to unlock ₹10,000 loan eligibility.
            </p>
          </motion.div>

          {/* 4. The Action Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4 mt-2"
          >
            {/* Action 1: Medical */}
            <motion.button 
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white border-2 border-red-50/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-red-100 transition-all"
            >
              <div className="bg-red-50 text-red-500 p-4 rounded-full shadow-inner border border-red-100">
                <HeartPulse size={26} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-slate-800 text-sm leading-tight">Claim Medical<br/>Cover</span>
            </motion.button>

            {/* Action 2: Micro-Loan */}
            <motion.button 
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white border-2 border-emerald-50/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-emerald-100 transition-all"
            >
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full shadow-inner border border-emerald-100">
                <Wallet size={26} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-slate-800 text-sm leading-tight">Request<br/>Micro-Loan</span>
            </motion.button>

            {/* Action 3: Passbook */}
            <motion.button 
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white border-2 border-blue-50/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-blue-100 transition-all"
            >
              <div className="bg-blue-50 text-blue-600 p-4 rounded-full shadow-inner border border-blue-100">
                <BookOpen size={26} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-slate-800 text-sm leading-tight">View<br/>Passbook</span>
            </motion.button>

            {/* Action 4: Voting */}
            <motion.button 
              variants={itemVariants} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white border-2 border-purple-50/50 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-purple-100 transition-all"
            >
              <div className="bg-purple-50 text-purple-600 p-4 rounded-full shadow-inner border border-purple-100">
                <Vote size={26} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-slate-800 text-sm leading-tight">Society<br/>Voting</span>
            </motion.button>
          </motion.div>

        </main>
      </div>
    </div>
  );
}
