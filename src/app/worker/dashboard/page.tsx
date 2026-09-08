"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, MapPin, Navigation, ShieldCheck, CheckCircle2, Camera } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function WorkerDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [bookingState, setBookingState] = useState<'IDLE' | 'RINGING' | 'ACCEPTED' | 'ARRIVED' | 'IN_PROGRESS'>('IDLE');
  const [timer, setTimer] = useState(15);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isUploadingOverride, setIsUploadingOverride] = useState(false);

  // SUPABASE REALTIME PRESENCE (EPHEMERAL STATE)
  useEffect(() => {
    if (!isOnline) return;
    
    const supabase = createClient();
    const channel = supabase.channel('public:locations');
    
    channel.on('presence', { event: 'sync' }, () => {
      console.log('Synced presence state');
    }).subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        // Mock geolocation ping every 5 seconds, skipping expensive Postgres writes
        const interval = setInterval(async () => {
          await channel.track({
            worker_id: 'worker-123',
            lat: 19.0760 + (Math.random() * 0.001),
            lng: 72.8777 + (Math.random() * 0.001),
            timestamp: new Date().toISOString()
          });
        }, 5000);
        return () => clearInterval(interval);
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOnline]);

  const handleCameraOverride = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setIsUploadingOverride(true);
    
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('bookingId', 'mock-booking-id-123'); // Mock ID
    
    try {
      const res = await fetch('/api/bookings/override', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setBookingState('IN_PROGRESS');
      } else {
        alert('Failed to override. Please try again.');
      }
    } catch (error) {
      alert('Error uploading visual proof.');
    } finally {
      setIsUploadingOverride(false);
    }
  };

  // Timer logic for incoming request
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bookingState === 'RINGING' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && bookingState === 'RINGING') {
      setBookingState('IDLE');
      setTimer(15);
    }
    return () => clearInterval(interval);
  }, [bookingState, timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    // Verify OTP if complete
    if (index === 3 && value && newOtp.every(v => v !== '')) {
      if (newOtp.join('') === '4829') {
        setBookingState('IN_PROGRESS');
      } else {
        alert('Invalid Service PIN');
      }
    }
  };

  const triggerMockGig = () => {
    setTimer(15);
    setBookingState('RINGING');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm relative z-10">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">SahiSeva <span className="text-indigo-600">Pro</span></h1>
          <p className="text-xs font-bold text-slate-500 mt-1">Sunil M. • Plumber</p>
        </div>
        
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all shadow-md ${isOnline ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-slate-400'}`}
        >
          <Power size={18} />
          {isOnline ? 'ONLINE' : 'GO ONLINE'}
        </button>
      </header>

      {/* MAIN MAP AREA (MOCK) */}
      <main className="flex-grow relative bg-slate-200 overflow-hidden">
        {/* Mock Map Background */}
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
        
        {bookingState === 'IDLE' && (
          <div className="absolute bottom-6 left-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-slate-200 text-center">
            {isOnline ? (
              <>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                  <MapPin className="text-emerald-600" size={24} />
                </div>
                <h3 className="font-bold text-slate-900">You are Online</h3>
                <p className="text-sm text-slate-500 mb-4">Searching for nearby service requests...</p>
                <button onClick={triggerMockGig} className="text-xs text-indigo-600 underline">Simulate Incoming Request (Dev Mode)</button>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Power className="text-slate-400" size={24} />
                </div>
                <h3 className="font-bold text-slate-900">You are Offline</h3>
                <p className="text-sm text-slate-500">Go online to receive jobs.</p>
              </>
            )}
          </div>
        )}

        {/* ACTIVE GIG UI */}
        {(bookingState === 'ACCEPTED' || bookingState === 'ARRIVED') && (
          <div className="absolute top-4 left-4 right-4 bg-indigo-900 text-white rounded-xl p-4 shadow-xl z-10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Current Gig</p>
                <h3 className="font-bold text-lg">Fix Leaking Pipe</h3>
              </div>
              <div className="text-right">
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-1">Est. Payout</p>
                <h3 className="font-bold text-lg text-emerald-400">₹450</h3>
              </div>
            </div>
            
            <div className="bg-indigo-950 rounded-lg p-3 flex items-center gap-3 mb-4 border border-indigo-800">
              <Navigation className="text-indigo-300" size={20} />
              <div>
                <p className="text-sm font-medium">B-402, Shivam Apartments</p>
                <p className="text-xs text-indigo-300">2.4 km away • 8 mins drive</p>
              </div>
            </div>

            {bookingState === 'ACCEPTED' ? (
              <button 
                onClick={() => setBookingState('ARRIVED')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-lg shadow-md transition-colors text-center"
              >
                I HAVE ARRIVED
              </button>
            ) : (
              <div className="bg-white text-slate-900 rounded-lg p-4 text-center mt-2 shadow-inner">
                <ShieldCheck className="mx-auto text-indigo-600 mb-2" size={28} />
                <h4 className="font-bold text-lg mb-1">Service Handshake</h4>
                <p className="text-sm text-slate-500 mb-4">Ask the customer for their 4-digit PIN to start.</p>
                <div className="flex gap-2 justify-center mb-4">
                  {[0,1,2,3].map((i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center font-mono text-xl font-bold bg-slate-50 border border-slate-300 rounded-md focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none"
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[i] = e.target.value;
                        setOtp(newOtp);
                        if (e.target.value && i < 3) {
                          const nextInput = e.target.parentElement?.children[i+1] as HTMLInputElement;
                          if (nextInput) nextInput.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setBookingState('IN_PROGRESS')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] mb-3"
                >
                  VERIFY & START JOB
                </button>
                
                {/* OFFLINE OVERRIDE */}
                <div className="border-t border-slate-200 pt-3 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-slate-400 font-bold uppercase">OR</span>
                  <label className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors cursor-pointer border border-slate-300 border-dashed">
                    <Camera size={18} />
                    Customer Offline / Camera Override
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      className="hidden" 
                      onChange={handleCameraOverride}
                    />
                  </label>
                  {isUploadingOverride && <p className="text-xs text-indigo-600 mt-2 font-bold animate-pulse">Uploading visual proof & overriding...</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* IN_PROGRESS UI */}
        {bookingState === 'IN_PROGRESS' && (
          <div className="absolute bottom-6 left-4 right-4 bg-white rounded-xl p-6 shadow-xl border-t-4 border-emerald-500 text-center z-10">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-600" size={32} />
            </div>
            <h3 className="font-bold text-2xl text-slate-900 mb-2">Job in Progress</h3>
            <p className="text-slate-500 mb-6">Timer started. Complete the job to generate the final bill.</p>
            <button 
              onClick={() => { setBookingState('IDLE'); setIsOnline(false); }}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-lg shadow-md transition-colors"
            >
              FINISH & COLLECT CASH
            </button>
          </div>
        )}
      </main>

      {/* INCOMING REQUEST MODAL (FRAMER MOTION) */}
      <AnimatePresence>
        {bookingState === 'RINGING' && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-slate-900 flex flex-col"
          >
            {/* Pulsing Map Header */}
            <div className="relative h-[40%] bg-slate-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120668.64790757237!2d72.82728952445831!3d19.06822838421882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709214013149!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, opacity: 0.6, pointerEvents: 'none', filter: 'grayscale(30%) contrast(120%) brightness(80%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply pointer-events-none"></div>
              </div>
              
              {/* Radar Rings */}
              <div className="absolute w-32 h-32 border-2 border-indigo-500 rounded-full opacity-50 animate-ping"></div>
              <div className="absolute w-64 h-64 border border-indigo-500 rounded-full opacity-25 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="relative z-10 bg-indigo-600 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.8)] border-4 border-indigo-900">
                <span className="font-bold text-2xl">{timer}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Secs</span>
              </div>
            </div>

            {/* Request Details */}
            <div className="flex-grow bg-white rounded-t-3xl -mt-6 relative z-20 p-6 flex flex-col">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-widest mb-3">New Request</span>
                <h2 className="text-3xl font-bold text-slate-900">Plumbing Repair</h2>
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 p-2 rounded-lg text-slate-600"><MapPin size={20} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Distance</p>
                      <p className="font-bold text-slate-900">2.4 km (8 mins)</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 font-bold">₹</div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Est. Earnings</p>
                      <p className="font-bold text-2xl text-slate-900">₹450</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setBookingState('IDLE')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl text-lg transition-colors"
                >
                  REJECT
                </button>
                <button 
                  onClick={() => setBookingState('ACCEPTED')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-lg shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-colors"
                >
                  ACCEPT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
