"use client";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: '#0f172a', padding: '80px 24px 30px', color: '#f8fafc', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 48, marginBottom: 60 }}>
          
          {/* Brand Col */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}>
              <div style={{ background: '#4f46e5', borderRadius: 10, padding: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', color: '#fff' }}>
                Sahi<span style={{ color: '#818cf8' }}>seva</span>
              </span>
            </Link>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 24, paddingRight: 20 }}>
              India's most trusted platform for booking verified maids, plumbers, electricians, and more. 100% Aadhaar verified workers.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 20, letterSpacing: '0.02em' }}>For Customers</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: "Book a Worker", href: "/search" },
                { label: "Trust Pass", href: "/customer/trust-pass" },
                { label: "How it Works", href: "/customer/how-it-works" },
                { label: "Safety & Verification", href: "/customer/safety" },
                { label: "Customer Reviews", href: "/customer/reviews" }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = '#94a3b8'; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 20, letterSpacing: '0.02em' }}>For Workers</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: "Join SahiSeva", href: "/worker/register" },
                { label: "Worker Login", href: "/worker/login" },
                { label: "Worker Benefits", href: "/worker/benefits" },
                { label: "Background Check", href: "/worker/background-check" },
                { label: "Training & Support", href: "/worker/training" }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = '#94a3b8'; }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 20, letterSpacing: '0.02em' }}>Contact Us</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li style={{ display: 'flex', gap: 10, color: '#94a3b8', fontSize: 14 }}>
                <Phone size={18} color="#4f46e5" style={{ flexShrink: 0 }} /> 
                <span style={{ paddingTop: 1 }}>+91 7820030487 <span style={{ display: 'block', fontSize: 12, color: '#64748b', marginTop: 3 }}>(9AM - 8PM, Mon-Sat)</span></span>
              </li>
              <li style={{ display: 'flex', gap: 10, color: '#94a3b8', fontSize: 14 }}>
                <Mail size={18} color="#4f46e5" style={{ flexShrink: 0 }} /> 
                <span style={{ paddingTop: 1 }}>support@sahiseva.in</span>
              </li>
              <li style={{ display: 'flex', gap: 10, color: '#94a3b8', fontSize: 14 }}>
                <MapPin size={18} color="#4f46e5" style={{ flexShrink: 0 }} /> 
                <span style={{ paddingTop: 1, lineHeight: 1.5 }}>
                  Dhanoli, Agra,<br />Uttar Pradesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
            © {new Date().getFullYear()} Sahiseva Tech Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: '#64748b', fontSize: 13, textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
