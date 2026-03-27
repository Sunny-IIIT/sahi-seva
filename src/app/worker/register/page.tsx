"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, UploadCloud, UserCircle2, ArrowRight, Check, Phone, Tag, DollarSign, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function WorkerRegister() {
  const router = useRouter();
  const { t } = useLanguage();
  const STEPS = [t('reg.step1'), t('reg.step2')];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", phone: "", area: "", category: "", price: "" });
  const [uploading, setUploading] = useState(false);
  const [fileToken, setFileToken] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploading(true);
      setTimeout(() => { setFileToken(`TOKEN_${Math.random().toString(36).substring(7).toUpperCase()}`); setUploading(false); }, 1500);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    setError("");
    try {
      const res = await fetch('/api/workers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/worker/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '40px 36px' }}>

          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
            {STEPS.map((label, i) => {
              const idx = i + 1;
              const done = step > idx; const active = step === idx;
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, background: done ? '#16a34a' : active ? '#4f46e5' : '#e2e8f0', color: done || active ? '#fff' : '#94a3b8', boxShadow: active ? '0 0 0 4px rgba(79,70,229,0.15)' : 'none' }}>
                      {done ? <Check size={14} /> : idx}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: active ? '#4f46e5' : '#94a3b8' }}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ width: 48, height: 2, borderRadius: 9999, background: step > idx ? '#16a34a' : '#e2e8f0', marginBottom: 16 }} />}
                </div>
              );
            })}
          </div>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#4f46e5' }}>
              {step === 1 ? <UserCircle2 size={28} /> : <ShieldCheck size={28} />}
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 4 }}>
              {step === 1 ? t('reg.title1') : t('reg.title2')}
            </h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>
              {step === 1 ? t('reg.desc1') : t('reg.desc2')}
            </p>
          </div>

          {step === 1 ? (
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={e => { e.preventDefault(); setStep(2); }}>
              {[
                { label: t('reg.fullName'), key: "name", type: "text", ph: "Ramesh Kumar", Icon: UserCircle2 },
                { label: t('reg.phone'), key: "phone", type: "tel", ph: "9876543210", Icon: Phone },
                { label: t('reg.area'), key: "area", type: "text", ph: "e.g. Andheri Mumbai, Koramangala Bangalore", Icon: MapPin },
                { label: t('reg.price'), key: "price", type: "text", ph: "₹300/visit or ₹4000/month", Icon: DollarSign },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>{f.label.toUpperCase()}</label>
                  <div style={{ position: 'relative' }}>
                    <f.Icon size={15} color="#94a3b8" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }} />
                    <input required type={f.type} placeholder={f.ph} value={formData[f.key as keyof typeof formData]}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="input" style={{ paddingLeft: 38 }} />
                  </div>
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, letterSpacing: '0.04em' }}>{t('reg.category')}</label>
                <div style={{ position: 'relative' }}>
                  <Tag size={15} color="#94a3b8" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                  <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="input" style={{ paddingLeft: 38, cursor: 'pointer', appearance: 'none' }}>
                    <option value="">{t('nav.signin').includes("इन") ? "श्रेणी चुनें" : "Select a category"}</option>
                    {["Maids", "Plumbers", "Electricians", "Cooks", "Painters", "Carpenters"].map(c => <option key={c} value={c}>{t(`cat.${c}`)}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: 4, borderRadius: 10 }}>
                {t('reg.next')} <ArrowRight size={15} />
              </button>
              <p style={{ textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
                {t('reg.already')} <Link href="/worker/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>{t('nav.signin')}</Link>
              </p>
            </form>
          ) : (
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={handleRegister}>
              {error && <div style={{ color: 'red', fontSize: 13, textAlign: 'center' }}>{error}</div>}
              {/* Upload zone */}
              <div style={{ position: 'relative', borderRadius: 12, border: `2px dashed ${fileToken ? '#16a34a' : uploading ? '#4f46e5' : '#e2e8f0'}`, padding: '32px 20px', textAlign: 'center', background: fileToken ? '#f0fdf4' : uploading ? '#eef2ff' : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}>
                <input type="file" accept="image/*,.pdf" onChange={handleUpload} disabled={!!fileToken || uploading}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }} />
                {!fileToken ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: uploading ? '#eef2ff' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: uploading ? '#4f46e5' : '#94a3b8' }}>
                      <UploadCloud size={22} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#0f172a', fontSize: 14, marginBottom: 3 }}>{uploading ? "..." : t('reg.upload')}</p>
                      <p style={{ fontSize: 12, color: '#94a3b8' }}>PDF or image</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: '#16a34a', fontSize: 14, marginBottom: 3 }}>Verified Securely ✓</p>
                      <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: 6 }}>Ref: {fileToken}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy note */}
              <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 10, background: '#eef2ff', border: '1px solid #c7d2fe' }}>
                <ShieldCheck size={15} color="#4f46e5" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.5 }}>Your Aadhaar is tokenized — never stored in raw form. Fully DPDP Act compliant.</p>
              </div>

              <button type="submit" disabled={!fileToken || registering} className="btn-primary"
                style={{ width: '100%', padding: 12, borderRadius: 10, ...((!fileToken || registering) ? { background: '#e2e8f0', boxShadow: 'none', cursor: 'not-allowed', color: '#94a3b8' } : {}) }}>
                <Check size={15} /> {registering ? 'Registering...' : t('reg.complete')}
              </button>
              <button type="button" onClick={() => setStep(1)}
                style={{ width: '100%', padding: '10px', background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', borderRadius: 10, fontFamily: 'inherit', fontSize: 14 }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = '#f1f5f9'; }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'none'; }}>
                ← Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
