import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function generateMetadata() {
  return { title: 'Trust Pass | SahiSeva' };
}

export default function TrustPassPage() {
  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 20, background: '#eef2ff', color: '#4f46e5', marginBottom: 24 }}>
              <ShieldCheck size={32} />
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Unlock the <span style={{ color: '#4f46e5' }}>Trust Pass</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Your golden ticket to unrestricted access. Connect with India's most verified and trusted professionals instantly.
            </p>
          </div>

          <div style={{ background: '#fff', borderRadius: 24, padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 24, textAlign: 'center' }}>
              What you get with Trust Pass
            </h2>
            
            <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
              {[
                "Unlimited access to phone numbers of all verified workers",
                "Direct calling and booking bypassing agency commission fees",
                "Priority customer support for disputes and replacements",
                "Verified background check reports in full detail"
              ].map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px', background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                  <div style={{ padding: 4, background: '#dcfce7', borderRadius: '50%', color: '#16a34a', flexShrink: 0 }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <p style={{ fontSize: '1.1rem', color: '#334155', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{benefit}</p>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12, fontWeight: 500 }}>ONLY ₹499 FOR LIFETIME ACCESS</p>
              <Link href="/search" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 32px', fontSize: '1.1rem', borderRadius: 12 }}>
                Browse Workers to Unlock <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
