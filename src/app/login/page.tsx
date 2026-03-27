"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function CustomerLogin() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #e8f4fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ background: '#4338ca', borderRadius: 10, padding: '7px', display: 'flex' }}>
              <ShieldCheck size={18} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#0f172a' }}>
              Sahi<span style={{ color: '#4338ca' }}>seva</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(67,56,202,0.1), 0 2px 8px rgba(0,0,0,0.04)', padding: '36px 32px' }}>

          {/* Icon + Title */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, background: '#eef2ff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#4338ca' }}>
              <Lock size={26} />
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 5 }}>
              {t('login.title')}
            </h1>
            <p style={{ fontSize: 14, color: '#64748b' }}>{t('login.subtitle')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>{t('login.mobile')}</label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} color="#94a3b8" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
                <input required type="tel" placeholder="e.g. 9999999999" defaultValue="9999999999"
                  className="input" style={{ paddingLeft: 38 }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>{t('login.otp')}</label>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={15} color="#94a3b8" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
                <input required type="text" placeholder="6-digit OTP" defaultValue="123456"
                  className="input" style={{ paddingLeft: 38, letterSpacing: '0.2em', fontWeight: 700, fontSize: 16 }} />
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 5 }}>
                <span style={{ color: '#4338ca', fontWeight: 600, cursor: 'pointer' }}>{t('login.resend')}</span> in 30s
              </p>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px', borderRadius: 10, marginTop: 4, fontSize: 15 }}>
              {t('login.btn')} <ArrowRight size={16} />
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
            {t('login.join')}
          </Link>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', marginTop: 18 }}>
          {t('login.terms')}
        </p>
      </div>
    </div>
  );
}
