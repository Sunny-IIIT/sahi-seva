"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ShieldCheck, CheckCircle2, AlertTriangle, CreditCard, ChevronDown, Wrench, Zap, Droplet } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { BookingRatingModal } from "@/components/BookingRatingModal";

function CustomerBookContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');
  
  const [bookingState, setBookingState] = useState<'IDLE' | 'SEARCHING' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED'>(initialQuery ? 'SEARCHING' : 'IDLE');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialQuery || null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'CASH'>('UPI');
  
  // Mock progression for demonstration purposes
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (bookingState === 'SEARCHING') {
      timeout = setTimeout(() => setBookingState('MATCHED'), 3000);
    }
    return () => clearTimeout(timeout);
  }, [bookingState]);

  const categories = [
    { id: 'plumbing', name: 'Plumber', icon: <Droplet size={24} />, eta: '8 min' },
    { id: 'electrical', name: 'Electrician', icon: <Zap size={24} />, eta: '12 min' },
    { id: 'repair', name: 'Appliance', icon: <Wrench size={24} />, eta: '15 min' }
  ];

  if (initialQuery && !categories.find(c => c.name.toLowerCase().includes(initialQuery.toLowerCase()) || c.id.toLowerCase() === initialQuery.toLowerCase())) {
    categories.unshift({
      id: initialQuery.toLowerCase(),
      name: initialQuery,
      icon: <Search size={24} />,
      eta: '5 min'
    });
  }

  const getWorkerDetails = () => {
    const catName = categories.find(c => c.id === selectedCategory)?.name || 'Professional';
    const lower = catName.toLowerCase();
    if (lower.includes('maid') || lower.includes('clean')) {
      return { name: 'Meena K.', initials: 'MK', role: catName, base: 300, total: 350, workerSplit: 332.5, fee: 17.5 };
    }
    if (lower.includes('electrician')) {
      return { name: 'Rajesh S.', initials: 'RS', role: catName, base: 350, total: 400, workerSplit: 380, fee: 20 };
    }
    return { name: 'Sunil M.', initials: 'SM', role: catName, base: 400, total: 450, workerSplit: 427.5, fee: 22.5 };
  };
  const worker = getWorkerDetails();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans relative overflow-hidden">
      
      {/* FULL SCREEN MAP */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120668.64790757237!2d72.82728952445831!3d19.06822838421882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709214013149!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, opacity: 0.85, pointerEvents: 'none', filter: 'grayscale(15%) contrast(110%) brightness(110%)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute inset-0 bg-indigo-900/10 mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Fallback Pulsing Workers */}
      {bookingState === 'IDLE' && (
        <>
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-500 rounded-full animate-ping border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-emerald-500 rounded-full animate-ping border-2 border-white shadow-lg" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-emerald-500 rounded-full animate-ping border-2 border-white shadow-lg" style={{ animationDelay: '0.6s' }}></div>
        </>
      )}

      {/* Back/Menu Header */}
      <div className="absolute top-4 left-4 z-20">
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-slate-900 font-bold border border-slate-200">
          <ChevronDown size={24} />
        </button>
      </div>

      {/* BOTTOM SHEET STATES */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: IDLE / CATEGORY SELECTION */}
          {bookingState === 'IDLE' && (
            <motion.div 
              key="idle"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What do you need?</h2>
              
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setBookingState('SEARCHING');
                    }}
                    className={`flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 transition-all flex-shrink-0 ${selectedCategory === cat.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 bg-white text-slate-600 hover:border-slate-200'}`}
                  >
                    <div className="mb-2">{cat.icon}</div>
                    <span className="font-bold text-sm">{cat.name}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">{cat.eta} away</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATE 2: SEARCHING */}
          {bookingState === 'SEARCHING' && (
            <motion.div 
              key="searching"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full animate-ping"></div>
                <div className="absolute inset-2 border-4 border-indigo-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="relative bg-indigo-600 text-white rounded-full p-4 shadow-xl">
                  <Search size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Finding nearby workers</h2>
              <p className="text-slate-500 mb-8">Matching you with the highest rated {worker.role}s...</p>
              
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-1/2 animate-pulse rounded-full"></div>
              </div>
            </motion.div>
          )}

          {/* STATE 3: MATCHED (WORKER ON WAY) */}
          {bookingState === 'MATCHED' && (
            <motion.div 
              key="matched"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6"
            >
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 text-xl border-2 border-indigo-200">
                    {worker.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{worker.name}</h3>
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
                      <span className="text-amber-500">★ 4.9</span> • {worker.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">ETA</p>
                  <p className="font-bold text-2xl text-emerald-600">8 min</p>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center mb-6 relative overflow-hidden">
                <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-100 opacity-50" />
                <p className="text-xs uppercase font-bold text-indigo-600 tracking-wider mb-2 relative z-10">Secure Service PIN</p>
                <h1 className="text-5xl font-mono font-black text-indigo-900 tracking-widest relative z-10">
                  4829
                </h1>
                <p className="text-sm text-indigo-700 mt-2 font-medium relative z-10">Share this PIN when the worker arrives</p>
              </div>

              <button 
                onClick={() => setBookingState('IN_PROGRESS')}
                className="w-full text-slate-500 text-sm font-bold py-2 underline"
              >
                [Dev] Simulate Arrival & Start
              </button>
            </motion.div>
          )}

          {/* STATE 4: IN PROGRESS */}
          {bookingState === 'IN_PROGRESS' && (
            <motion.div 
              key="inprogress"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-8 text-center border-t-4 border-emerald-500"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Service in Progress</h2>
              <p className="text-slate-500 font-medium mb-6">{worker.name} is currently working on your request.</p>
              
              <button 
                onClick={() => setBookingState('COMPLETED')}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-lg shadow-md hover:bg-black transition-colors"
              >
                [Dev] Simulate Job Completion
              </button>
            </motion.div>
          )}

          {/* STATE 5: COMPLETED (PAYMENT SHEET) */}
          {bookingState === 'COMPLETED' && (
            <motion.div 
              key="completed"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto flex flex-col p-6"
            >
              <div className="text-center mb-6 shrink-0">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-slate-900">Job Completed!</h2>
                <p className="text-sm text-slate-500">Please review your final bill</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200 space-y-3 shrink-0">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">{worker.role} Service (Base)</span>
                  <span className="font-bold text-slate-900">₹{worker.base}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">Parts / Extra Time</span>
                  <span className="font-bold text-slate-900">₹50</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-200">
                  <span>SahiSeva Cooperative Fee (5%)</span>
                  <span>₹{worker.fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Worker Payout (95%)</span>
                  <span>₹{worker.workerSplit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-slate-200">
                  <span className="font-bold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{worker.total}</span>
                </div>
              </div>

              {/* PAYMENT OPTIONS */}
              <div className="mb-6 shrink-0">
                <h3 className="font-bold text-slate-900 mb-3 text-sm">Select Payment Method</h3>
                <div className="space-y-2">
                  {[
                    { id: 'UPI', name: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                    { id: 'CARD', name: 'Credit / Debit Card', icon: '💳' },
                    { id: 'NETBANKING', name: 'Net Banking', icon: '🏦' },
                    { id: 'CASH', name: 'Cash on Completion', icon: '💵' }
                  ].map(method => (
                    <label 
                      key={method.id} 
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                      onClick={() => setPaymentMethod(method.id as any)}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-indigo-600' : 'border-slate-300'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                      </div>
                      <span className="text-lg">{method.icon}</span>
                      <span className="font-bold text-slate-700 text-sm">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setShowRatingModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 rounded-xl text-lg shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-700 transition-colors mb-4 shrink-0"
              >
                <CreditCard size={20} /> PAY ₹{worker.total} NOW
              </button>

              <div className="text-center shrink-0">
                <button 
                  onClick={() => setShowTicketModal(true)}
                  className="text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-red-500 transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                  <AlertTriangle size={14} /> Report a Problem
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* RATING MODAL (Triggered after payment) */}
      <AnimatePresence>
        {showRatingModal && (
          <BookingRatingModal 
            bookingId="demo-booking-id" 
            workerName={worker.name}
            onClose={() => {
              setShowRatingModal(false);
              setBookingState('IDLE');
              setSelectedCategory(null);
            }}
            onSuccess={() => {
              setShowRatingModal(false);
              setBookingState('IDLE');
              setSelectedCategory(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* TICKET DISPUTE MODAL (Overlay) */}
      <AnimatePresence>
        {showTicketModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertTriangle size={24} />
                <h3 className="font-bold text-xl text-slate-900">File a Dispute</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">We hold payouts in escrow for 24 hours. Let us know what went wrong.</p>
              
              <textarea 
                placeholder="Describe the issue..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm min-h-[100px] mb-4 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              ></textarea>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 py-3 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { setShowTicketModal(false); setBookingState('IDLE'); setSelectedCategory(null); }}
                  className="flex-1 py-3 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 shadow-md"
                >
                  Submit Ticket
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function CustomerBook() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100 flex items-center justify-center font-bold text-slate-500">Loading Radar...</div>}>
      <CustomerBookContent />
    </Suspense>
  );
}
