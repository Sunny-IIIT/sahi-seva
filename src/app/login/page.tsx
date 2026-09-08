"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Shield, MessageCircle, Timer, ArrowRight } from "lucide-react";

export default function CustomerLogin() {
  const router = useRouter();
  const supabase = createClient();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="bg-[#f8fafc] text-[#131b2e] antialiased min-h-screen flex flex-col justify-between selection:bg-[#4338ca] selection:text-white font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Public+Sans:wght@600;700&display=swap');
      `}} />

      {/* Main Center Authentication Canvas */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[460px] bg-white rounded-xl border border-[#e2e8f0] p-6 sm:p-8 shadow-[0_2px_4px_-1px_rgba(15,23,42,0.04),0_4px_6px_-2px_rgba(15,23,42,0.03)] relative overflow-hidden">
          {/* Subtle Brand Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2a14b4] to-[#4338ca]"></div>
          
          {/* Header & Tagline */}
          <div className="text-center pt-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#e2e8f0] mb-4">
              <Shield className="text-[#006c4a]" size={16} />
              <span className="font-bold text-[11px] tracking-wider uppercase text-[#464554]">National Verified Worker Network</span>
            </div>
            <h1 className="font-bold text-[24px] text-[#131b2e] tracking-tight font-['Public_Sans']">Welcome Back</h1>
            <p className="text-[14px] text-[#464554] mt-1">Enter your verified credentials or login via fast OTP</p>
          </div>

          {/* Continue with Google Button */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-[#cbd5e1] rounded-lg hover:bg-[#f8fafc] hover:border-[#94a3b8] transition-colors duration-150 text-[#131b2e] font-semibold text-[14px] active:scale-[0.99]" 
            type="button"
          >
            <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z" fill="#34A853"></path>
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" fill="#FBBC05"></path>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="border-t border-[#e2e8f0] w-full"></div>
            <span className="bg-white px-3 text-[#464554] font-bold text-[11px] tracking-wider uppercase text-center shrink-0">OR continue with phone</span>
            <div className="border-t border-[#e2e8f0] w-full"></div>
          </div>

          {/* Authentication Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Mobile Input */}
            <div>
              <label className="block font-semibold text-[14px] text-[#131b2e] mb-1.5" htmlFor="mobileInput">
                Registered Mobile Number
              </label>
              <div className="relative flex rounded-lg border border-[#cbd5e1] bg-white focus-within:border-[#4338ca] focus-within:ring-2 focus-within:ring-[#4338ca]/15 transition-all">
                <div className="flex items-center gap-1.5 px-3 bg-[#f2f3ff] border-r border-[#cbd5e1] rounded-l-lg text-[#131b2e] shrink-0 select-none">
                  <span className="text-base leading-none">🇮🇳</span>
                  <span className="font-medium text-[14px] font-['JetBrains_Mono']">+91</span>
                </div>
                <input 
                  className="w-full px-3 py-2.5 bg-transparent border-0 font-medium text-[14px] font-['JetBrains_Mono'] text-[#131b2e] placeholder:text-[#777586] focus:ring-0 focus:outline-none" 
                  id="mobileInput" 
                  maxLength={10} 
                  placeholder="98765 43210" 
                  type="tel"
                />
              </div>
            </div>

            {/* 6-digit OTP Block */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[14px] text-[#131b2e]">6-Digit Civic Verification OTP</label>
                <button className="font-semibold text-[12px] text-[#2a14b4] hover:underline flex items-center gap-1" type="button">
                  <MessageCircle size={14} />
                  <span>Get OTP on WhatsApp</span>
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[0,1,2,3,4,5].map((idx) => (
                  <input 
                    key={idx}
                    ref={el => { otpRefs.current[idx] = el; }}
                    value={otp[idx]}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    className="h-12 w-full text-center font-medium text-[20px] font-['JetBrains_Mono'] text-[#131b2e] bg-white border border-[#cbd5e1] rounded-lg focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 focus:outline-none transition-all" 
                    inputMode="numeric" 
                    maxLength={1} 
                    type="text" 
                  />
                ))}
              </div>
              <p className="text-[12px] text-[#464554] mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Timer size={14} className="text-[#006c4a]" />
                  Resend code in <strong className="font-medium font-['JetBrains_Mono'] text-[#131b2e]">00:48</strong>
                </span>
                <button className="text-[#464554] hover:text-[#2a14b4] transition-colors" type="button">Need Help?</button>
              </p>
            </div>

            {/* Primary Submit Button */}
            <button 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#4338ca] hover:bg-[#3730a3] text-white rounded-lg font-semibold text-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4338ca] mt-6" 
              type="submit"
            >
              <span>Authenticate & Proceed</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Sign Up Redirection Footer */}
          <div className="mt-6 pt-4 border-t border-[#f1f5f9] text-center">
            <p className="text-[14px] text-[#464554]">
              Don't have an account?{' '}
              <Link className="font-semibold text-[#2a14b4] hover:underline hover:text-[#4338ca] transition-colors" href="/register">Sign Up here</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
