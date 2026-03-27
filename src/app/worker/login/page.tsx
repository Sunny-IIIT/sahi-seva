"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, ShieldCheck, ArrowRight, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import { useState } from "react";

export default function WorkerLogin() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return setError("Invalid phone number");
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (res.ok) setOtpSent(true);
      else setError("Failed to send OTP");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, type: 'worker' })
      });
      const data = await res.json();
      if (res.ok) {
        if (!data.registered) {
           setError("Account not found. Please register.");
        } else {
           router.push("/worker/dashboard");
        }
      } else {
        setError(data.message || data.error || "Verification failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f8fafc 0%, #eef2ff 60%, #e0e7ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ background: '#4338ca', borderRadius: 10, padding: '7px', display: 'flex' }}>
              <ShieldCheck size={18} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>
              Sahi<span style={{ color: '#4338ca' }}>seva</span> <span style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>Partner</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(67,56,202,0.1), 0 2px 8px rgba(0,0,0,0.04)', padding: '36px 32px' }}>

          {/* Icon + Title */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, background: '#eef2ff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#4338ca' }}>
              <Briefcase size={26} />
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 5 }}>
              {t('wlogin.title')}
            </h1>
            <p style={{ fontSize: 14, color: '#64748b' }}>{t('wlogin.subtitle')}</p>
          </div>

          {/* Form */}
          <form onSubmit={otpSent ? handleVerify : handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && <div style={{ color: 'red', fontSize: 13, textAlign: 'center' }}>{error}</div>}

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>{t('login.mobile')}</label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} color="#94a3b8" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
                <input required type="tel" placeholder="e.g. 9876543210" value={phone} onChange={e => setPhone(e.target.value)} disabled={otpSent}
                  className="input" style={{ paddingLeft: 38 }} />
              </div>
            </div>

            {otpSent && (
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>{t('login.otp')}</label>
                <div style={{ position: 'relative' }}>
                  <ShieldCheck size={15} color="#94a3b8" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
                  <input required type="text" placeholder="4-digit OTP" value={otp} onChange={e => setOtp(e.target.value)}
                    className="input" style={{ paddingLeft: 38, letterSpacing: '0.2em', fontWeight: 700, fontSize: 16 }} />
                </div>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 5 }}>
                  <span style={{ color: '#4338ca', fontWeight: 600, cursor: 'pointer' }} onClick={() => setOtpSent(false)}>{t('login.resend')}</span>
                </p>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '13px', borderRadius: 10, marginTop: 4, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Please wait...' : (otpSent ? 'Verify OTP' : t('wlogin.btn'))} <ArrowRight size={16} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{t('login.or')}</span>
            <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          </div>

          <Link href="/worker/register" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', border: '1.5px solid #e2e8f0', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 600, color: '#475569', background: '#f8fafc', transition: 'border-color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c7d2fe'; (e.currentTarget as HTMLAnchorElement).style.color = '#4338ca'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLAnchorElement).style.color = '#475569'; }}>
            {t('wlogin.join')}
          </Link>
        </div>

      </div>
    </div>
  );
}
