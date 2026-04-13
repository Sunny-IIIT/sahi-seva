import { Banknote, Clock, BadgeCheck, Users } from "lucide-react";
import Link from "next/link";

export function generateMetadata() {
  return { title: 'Worker Benefits | SahiSeva' };
}

export default function WorkerBenefitsPage() {
  return (
    <>
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
             <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Why Join <span style={{ color: '#4f46e5' }}>SahiSeva?</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Take control of your income. Earn more without paying commissions to agencies.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 50 }}>
            {[
              { icon: Banknote, title: "Zero Commission Fees", desc: "Keep 100% of what you earn. We never take a cut from your daily or monthly payments." },
              { icon: Users, title: "Direct Customer Contact", desc: "Customers call you directly. Negotiate your own rates and finalize terms that work for you." },
              { icon: BadgeCheck, title: "Verified Professional Badge", desc: "Stand out with an Aadhaar-verified badge that makes customers trust you instantly." },
              { icon: Clock, title: "Flexible Schedule", desc: "Choose the areas you want to work in and set your own timings." }
            ].map((benefit, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '24px 32px', borderRadius: 20, display: 'flex', gap: 20, alignItems: 'center', border: '1px solid #e2e8f0' }}>
                 <div style={{ background: '#eef2ff', color: '#4f46e5', padding: 12, borderRadius: 12, flexShrink: 0 }}>
                  <benefit.icon size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{benefit.title}</h3>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: 1.5 }}>{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/worker/register" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 32px', fontSize: '1.1rem', borderRadius: 12 }}>
              Register as a Worker Today
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
