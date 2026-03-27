"use client";
import { useState, useEffect } from "react";
import { Star, Eye, ShieldCheck, TrendingUp, Edit3, Check, X, Bell, BookOpen, UserCircle2, Power } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";

export default function WorkerDashboard() {
  const { t } = useLanguage();
  
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const STATS = [
    { label: t('dash.stat1'), value: "120", sub: t('dash.stat1sub'), Icon: Eye, color: "#4f46e5", bg: "#eef2ff" },
    { label: t('dash.stat2'), value: worker?.jobsDone || "0", sub: t('dash.stat2sub'), Icon: Star, color: "#d97706", bg: "#fffbeb" },
    { label: t('dash.stat3'), value: worker?.jobsDone || "0", sub: t('dash.stat3sub'), Icon: BookOpen, color: "#16a34a", bg: "#f0fdf4" },
  ];

  const [pricing, setPricing] = useState("₹300/visit");
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(pricing);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    fetch('/api/workers/me')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setWorker(data.worker);
          setPricing(data.worker.priceRate || "₹300/visit");
        }
        setLoading(false);
      });
  }, []);

  const toggleVisibility = async () => {
    if (!worker) return;
    const newStatus = !worker.isProfilePublic;
    setWorker({ ...worker, isProfilePublic: newStatus });
    try {
      const res = await fetch('/api/workers/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isProfilePublic: newStatus })
      });
      if (res.ok) {
        showToast(newStatus ? 'Profile is now Visible' : 'Profile Hidden');
      }
    } catch {}
  };

  const savePrice = async (newPrice: string) => {
    setPricing(newPrice);
    setIsEditing(false);
    try {
      const res = await fetch('/api/workers/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceRate: newPrice })
      });
      if (res.ok) showToast('Pricing Updated!');
    } catch {}
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (!worker) return <div style={{ padding: 40, textAlign: 'center' }}>Not logged in</div>;


  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 60 }}>

      {/* Indigo top banner */}
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', padding: '32px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginBottom: 6 }}>WORKER DASHBOARD</p>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.025em', marginBottom: 4 }}>{t('dash.hello')} {worker.name.split(' ')[0]} 👋</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{t('dash.subtitle')}</p>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 10, padding: 10, cursor: 'pointer', color: '#fff' }}>
            <Bell size={20} />
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', marginTop: -48, position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Pending Verification Banner */}
        {worker.status === 'PENDING' && (
          <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ color: '#d97706', marginTop: 2 }}><ShieldCheck size={24} /></div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#b45309', marginBottom: 4 }}>Profile Review in Progress</h3>
              <p style={{ fontSize: 13, color: '#d97706', lineHeight: 1.5 }}>
                Your identity verification is currently being processed by our team. You can setup your profile, but you will not appear in public search results until approved.
              </p>
            </div>
          </div>
        )}

        {/* Profile card */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '24px 28px', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 72, height: 72, borderRadius: 16, overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <Image src="https://i.pravatar.cc/150?u=ramesh" alt="Profile" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: '50%', background: '#16a34a', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={11} color="white" />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{worker.name}</h2>
              {worker.verified && <ShieldCheck size={17} color="#16a34a" />}
            </div>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>{t(`cat.${worker.category}`)} · ID: WRK-{worker.id.substring(worker.id.length - 5).toUpperCase()}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ l: t('dash.badge1'), c: '#16a34a', bg: '#f0fdf4' }, { l: t('dash.badge2'), c: '#d97706', bg: '#fffbeb' }, { l: t('dash.badge3'), c: '#4f46e5', bg: '#eef2ff' }]
                .map(b => <span key={b.l} style={{ fontSize: 12, fontWeight: 700, color: b.c, background: b.bg, padding: '3px 10px', borderRadius: 9999 }}>{b.l}</span>)}
            </div>
          </div>

          {/* Trust score */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: '16px 24px', textAlign: 'center', minWidth: 100 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 4 }}>{t('dash.trust')}</p>
            <p style={{ fontSize: '2.4rem', fontWeight: 900, color: '#4f46e5', letterSpacing: '-0.04em', lineHeight: 1 }}>{worker.trustScore}</p>
            <p style={{ fontSize: 12, color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', marginTop: 6 }}>
              <TrendingUp size={11} /> Top 5%
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color: s.color }}>
                <s.Icon size={18} />
              </div>
              <p style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: s.color, fontWeight: 700, marginTop: 5 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>

          {/* Pricing */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{t('dash.pricingTitle')}</h3>
              <button onClick={() => { setTempPrice(pricing); setIsEditing(!isEditing); }}
                style={{ background: isEditing ? '#eef2ff' : '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 7, cursor: 'pointer', color: isEditing ? '#4f46e5' : '#64748b' }}>
                <Edit3 size={15} />
              </button>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', marginBottom: 8 }}>{t('dash.currentRate')}</p>
              {isEditing ? (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={tempPrice} onChange={e => setTempPrice(e.target.value)} className="input"
                    style={{ fontSize: '1rem', fontWeight: 700 }} autoFocus />
                  <button onClick={() => savePrice(tempPrice)} style={{ background: '#16a34a', border: 'none', borderRadius: 8, padding: '0 12px', cursor: 'pointer', color: '#fff' }}><Check size={15} /></button>
                  <button onClick={() => setIsEditing(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '0 10px', cursor: 'pointer', color: '#64748b' }}><X size={15} /></button>
                </div>
              ) : (
                <p style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{pricing}</p>
              )}
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 10, lineHeight: 1.5 }}>
                {t('dash.pricingDesc')}
              </p>
            </div>
          </div>

          {/* Quick actions & Profile Toggle */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 18 }}>{t('dash.quick')}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Profile Toggle */}
              <button
                onClick={toggleVisibility}
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: 10, 
                  border: `1px solid ${worker.isProfilePublic ? '#16a34a' : '#ef4444'}`, 
                  background: worker.isProfilePublic ? '#f0fdf4' : '#fef2f2', 
                  color: worker.isProfilePublic ? '#16a34a' : '#ef4444', 
                  fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Power size={18} /> {worker.isProfilePublic ? 'Profile is Visible (ON)' : 'Profile is Hidden (OFF)'}
                </div>
                {worker.isProfilePublic ? <Check size={16} /> : <X size={16} />}
              </button>

              {[
                { l: t('dash.action1'), c: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe', msg: t('dash.toast1') },
                { l: t('dash.action2'), c: '#475569', bg: '#f8fafc', border: '#e2e8f0', msg: t('dash.toast2') },
              ].map(a => (
                <button
                  key={a.l}
                  onClick={() => showToast(a.msg)}
                  style={{ width: '100%', textAlign: 'left', padding: '11px 14px', borderRadius: 10, border: `1px solid ${a.border}`, background: a.bg, color: a.c, fontWeight: 600, fontSize: 13.5, cursor: 'pointer', fontFamily: 'inherit', transition: 'transform 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(0)'; }}
                >
                  {a.l} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: 9999,
          fontSize: 14, fontWeight: 600, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          animation: 'fadeUp 0.3s ease both', zIndex: 100, display: 'flex', alignItems: 'center', gap: 8
        }}>
          ✨ {toast}
        </div>
      )}
    </div>
  );
}
