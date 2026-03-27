"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Menu, X, Home, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage, Lang } from "@/lib/i18n";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, width: '100%',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ background: '#4f46e5', borderRadius: 10, padding: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={18} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', color: '#0f172a' }}>
            Sahi<span style={{ color: '#4f46e5' }}>seva</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden sm:flex">
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none',
            color: pathname === '/' ? '#4f46e5' : '#475569',
            background: pathname === '/' ? '#eef2ff' : 'transparent',
          }}>
            <Home size={16} /> {t('nav.home')}
          </Link>
          <Link href="/worker/register" style={{
            padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none',
            color: pathname === '/worker/register' ? '#4f46e5' : '#475569',
            background: pathname === '/worker/register' ? '#eef2ff' : 'transparent',
          }}>
            {t('nav.join')}
          </Link>
          
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <Globe size={15} color="#64748b" />
            <select 
              value={lang} 
              onChange={e => setLang(e.target.value as Lang)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
            >
              <option value="EN">English</option>
              <option value="HI">Hindi</option>
              <option value="GU">Gujarati</option>
            </select>
          </div>

          <Link href="/login" className="btn-primary" style={{ borderRadius: 9, padding: '9px 18px', textDecoration: 'none' }}>
            {t('nav.signin')}
          </Link>
        </nav>

        {/* Mobile button */}
        <button onClick={() => setOpen(!open)} className="sm:hidden"
          style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#475569' }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ padding: '0 24px 16px', display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid #e2e8f0' }} className="sm:hidden">
          <Link href="/" onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: pathname === '/' ? '#4f46e5' : '#475569', background: pathname === '/' ? '#eef2ff' : '#f8fafc', textDecoration: 'none' }}>
            <Home size={16} /> {t('nav.home')}
          </Link>
          <Link href="/worker/register" onClick={() => setOpen(false)}
            style={{ padding: '10px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: pathname === '/worker/register' ? '#4f46e5' : '#475569', background: pathname === '/worker/register' ? '#eef2ff' : '#f8fafc', textDecoration: 'none' }}>
            {t('nav.join')}
          </Link>

          {/* Mobile Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: '#f8fafc' }}>
            <Globe size={16} color="#64748b" />
            <select 
              value={lang} 
              onChange={e => setLang(e.target.value as Lang)}
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 14, fontWeight: 600, color: '#475569', width: '100%' }}
            >
              <option value="EN">English</option>
              <option value="HI">Hindi</option>
              <option value="GU">Gujarati</option>
            </select>
          </div>

          <Link href="/login" onClick={() => setOpen(false)} className="btn-primary"
            style={{ textDecoration: 'none', textAlign: 'center', borderRadius: 9 }}>
            {t('nav.signin')}
          </Link>
        </div>
      )}
    </header>
  );
}
