"use client";
import Link from "next/link";
import { CATEGORIES } from "@/lib/mock";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type Cat = typeof CATEGORIES[number] & { image: string; desc: string };

export function CategoryGrid() {
  const { t } = useLanguage();
  return (
    <section style={{ background: '#f8fafc', padding: '72px 24px 80px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ display: 'inline-block', background: '#eef2ff', color: '#4338ca', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', padding: '4px 14px', borderRadius: 9999, marginBottom: 14 }}>
            20+ {t('cat.Maids') === "Maids" ? "CATEGORIES" : "श्रेणियाँ"}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10, lineHeight: 1.15 }}>
            {t('hero.title1').split(' ')[0]}, <span style={{ color: '#4338ca' }}>Verified & Ready</span>
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
            {t('cat.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
          {(CATEGORIES as Cat[]).map((cat) => (
            <Link href={`/category/${cat.id}`} key={cat.id} style={{ textDecoration: 'none' }}>
              <div
                style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'all 0.22s ease' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(-5px)';
                  el.style.boxShadow = '0 12px 36px rgba(67,56,202,0.14)';
                  el.style.borderColor = '#c7d2fe';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  el.style.borderColor = '#e8eaf0';
                }}
              >
                {/* Image — using plain img tag to avoid Next.js domain config */}
                <div style={{ position: 'relative', height: 165, overflow: 'hidden', background: '#eef2ff' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.src.includes('1504307651254')) {
                        target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=75';
                      }
                    }}
                  />
                  {/* Bottom gradient */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top, rgba(15,23,42,0.25), transparent)' }} />
                </div>

                {/* Content */}
                <div style={{ padding: '16px 18px 18px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 5, letterSpacing: '-0.01em' }}>
                    {t(`cat.${cat.name}`)}
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, marginBottom: 14 }}>
                    {cat.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#4338ca', fontSize: 13, fontWeight: 700 }}>
                    {t('cat.bookNow')} <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
