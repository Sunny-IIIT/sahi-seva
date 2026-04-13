import { Search, UserCheck, Unlock, PhoneCall } from "lucide-react";
import Link from "next/link";

export function generateMetadata() {
  return { title: 'How It Works | SahiSeva' };
}

const steps = [
  {
    icon: Search,
    title: "1. Search for Services",
    description: "Browse through 20+ categories including Maids, Cooks, Plumbers, and more in your local area."
  },
  {
    icon: UserCheck,
    title: "2. View Verified Profiles",
    description: "Check past reviews, ratings, Aadhaar-verified badges, and clear pricing expectations before deciding."
  },
  {
    icon: Unlock,
    title: "3. Get The Trust Pass",
    description: "Unlock immediate, unrestricted access to the contact details of any professional on the platform securely."
  },
  {
    icon: PhoneCall,
    title: "4. Hire Directly",
    description: "Call the worker and finalize the timings and scope of work on your own terms. Zero agency interference!"
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <div style={{ minHeight: '80vh', background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
             <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How SahiSeva <span style={{ color: '#4f46e5' }}>Works</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
              Four simple steps to find the most reliable, background-checked professionals for your home.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32, marginBottom: 60 }}>
            {steps.map((step, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '40px 32px', borderRadius: 24, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 80, height: 80, borderRadius: 24, background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <step.icon size={36} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '1.05rem' }}>{step.description}</p>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Link href="/search" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 32px', fontSize: '1.1rem', borderRadius: 12 }}>
              Start Searching Now
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
