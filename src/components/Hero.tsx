"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, Shield, Star, CheckCircle, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const POPULAR = ["Maids", "Plumbers", "Cooks", "Electricians", "Painters"];
const ALL_CATEGORIES = ["Maids", "Plumbers", "Cooks", "Electricians", "Painters", "Carpenters", "Cleaning", "Pest Control", "Appliance Repair"];
const CITIES = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Gurugram", "Noida"];

export function Hero() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  // Auto-suggest states
  const [showCat, setShowCat] = useState(false);
  const [showCity, setShowCity] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setShowCat(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setShowCity(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      // Append location to query if present
      const finalQ = location.trim() ? `${query} ${location}` : query;
      router.push(`/search?q=${encodeURIComponent(finalQ)}`);
    }
  };

  const filteredCats = ALL_CATEGORIES.filter(c => c.toLowerCase().includes(query.toLowerCase()));
  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(location.toLowerCase()));



  return (
    <section style={{ background: '#fff' }}>

      {/* Main hero */}
      <div style={{ background: 'linear-gradient(160deg, #fafbff 0%, #f0f4ff 100%)', padding: '72px 24px 64px', borderBottom: '1px solid #e8ecf8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Top badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #c7d2fe', borderRadius: 9999, padding: '6px 16px', fontSize: 13, fontWeight: 600, color: '#4338ca', boxShadow: '0 2px 8px rgba(67,56,202,0.1)' }}>
              <CheckCircle size={14} fill="#4338ca" color="white" />
              {t('hero.badge')}
            </div>
          </div>

          {/* Headline */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: 18 }}>
              {t('hero.title1')}<br />
              <span style={{ color: '#4338ca' }}>{t('hero.title2')} {t('hero.title3')}</span>
            </h1>
            <p style={{ fontSize: 17, color: '#475569', maxWidth: 540, margin: '0 auto', lineHeight: 1.7, fontWeight: 450 }}>
              {t('hero.desc')}
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ maxWidth: 760, margin: '0 auto 28px', background: '#fff', borderRadius: 16, border: '1.5px solid #e0e5f2', boxShadow: '0 8px 32px rgba(67,56,202,0.12)', padding: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            
            {/* Category Input */}
            <div ref={catRef} style={{ position: 'relative', flex: 1, minWidth: 180 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', borderRadius: 10, padding: '10px 14px', border: '1px solid #e8ecf8', height: '100%' }}>
                <Search size={16} color="#4338ca" style={{ flexShrink: 0 }} />
                <input 
                  value={query}
                  onChange={e => { setQuery(e.target.value); setShowCat(true); }}
                  onFocus={() => setShowCat(true)}
                  placeholder={t('hero.searchService')} 
                  style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#0f172a', width: '100%', fontFamily: 'inherit', fontWeight: 500 }} 
                  autoComplete="off"
                />
              </div>
              {/* Category Dropdown */}
              {showCat && query && filteredCats.length > 0 && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, padding: '8px 0', maxHeight: 220, overflowY: 'auto' }}>
                  {filteredCats.map(cat => (
                    <div 
                      key={cat} 
                      onClick={() => { setQuery(cat); setShowCat(false); document.getElementById('city-input')?.focus(); }}
                      style={{ padding: '10px 16px', fontSize: 14, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Search size={14} color="#64748b" /> {t(`cat.${cat}`) || cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* City Input */}
            <div ref={cityRef} style={{ position: 'relative', flex: 1, minWidth: 160 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', borderRadius: 10, padding: '10px 14px', border: '1px solid #e8ecf8', height: '100%' }}>
                <MapPin size={16} color="#0891b2" style={{ flexShrink: 0 }} />
                <input 
                  id="city-input"
                  value={location}
                  onChange={e => { setLocation(e.target.value); setShowCity(true); }}
                  onFocus={() => setShowCity(true)}
                  placeholder={t('hero.searchCity')} 
                  style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#0f172a', width: '100%', fontFamily: 'inherit', fontWeight: 500 }} 
                  autoComplete="off"
                />
              </div>
              {/* City Dropdown */}
              {showCity && filteredCities.length > 0 && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, padding: '8px 0', maxHeight: 220, overflowY: 'auto' }}>
                  <div style={{ padding: '6px 16px', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>POPULAR CITIES</div>
                  {filteredCities.map(city => (
                    <div 
                      key={city} 
                      onClick={() => { setLocation(city); setShowCity(false); handleSearch(); }}
                      style={{ padding: '10px 16px', fontSize: 14, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <MapPin size={14} color="#64748b" /> {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ borderRadius: 10, padding: '10px 24px', fontSize: 14, whiteSpace: 'nowrap', border: 'none', cursor: 'pointer', fontFamily: 'inherit', height: '100%' }}>
              {t('hero.searchBtn')} <ArrowRight size={15} />
            </button>
          </form>

          {/* Popular tags */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
            <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>{t('hero.popular')}</span>
            {POPULAR.map(tag => (
              <button key={tag} onClick={() => router.push(`/search?q=${tag}`)} style={{ fontSize: 13, color: '#4338ca', background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: 9999, padding: '4px 12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {t(`cat.${tag}`)}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 800, margin: '0 auto' }}>
            {[
              { icon: <Users size={18} />, value: '2,400+', label: t('hero.stat1'), color: '#4338ca', bg: '#eef2ff' },
              { icon: <TrendingUp size={18} />, value: '18,000+', label: t('hero.stat2'), color: '#16a34a', bg: '#f0fdf4' },
              { icon: <Star size={18} />, value: '4.8 / 5', label: t('hero.stat3'), color: '#d97706', bg: '#fffbeb' },
              { icon: <Shield size={18} />, value: '100%', label: t('hero.stat4'), color: '#0891b2', bg: '#ecfeff' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', border: '1px solid #e8ecf8', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
