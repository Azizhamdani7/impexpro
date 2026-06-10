/* Generated from the original static HTML pages. */

export const homeHtml = `<!-- ═══ ABOUT ═══ -->
<section class="section fade-in" style="background:var(--off-white);">
  <div class="about-grid">
    <div class="about-visual">
      <div class="about-card">
        <p class="about-card-quote">"Our mission is to bridge the gap between ambition and execution through strategic consultancy, practical training, and dedicated end-to-end support."</p>
        <div class="about-card-name">Muhammad Faheem Akhtar</div>
        <div class="about-card-title">Founder &amp; CEO · Impex-Pro Business Consultant</div>
        <div class="about-float"><div class="about-float-num">400+</div><div class="about-float-lbl">Trained</div></div>
      </div>
      <div class="about-img-wrap">
        <img loading="lazy" src="/images/aboutVisual.png" alt="About Impex-Pro">
      </div>
    </div>
    <div class="about-text">
      <div class="section-tag">About Impex-Pro</div>
      <h2 class="section-title">Your Trusted <em>Global Trade</em> Partner</h2>
      <p>Impex-Pro Business Consultant, founded and led by <strong>Muhammad Faheem Akhtar</strong>, is a dynamic consultancy firm offering <strong>One-Window Solutions</strong> for entrepreneurs, startups, and growing businesses aiming to thrive in today's competitive global trade environment.</p>
      <p>Our mission is to bridge the gap between ambition and execution by offering strategic consultancy, practical training, and dedicated support tailored to the unique needs of each client.</p>
      <p>Driven by a client-centric philosophy, Impex-Pro is more than a consultancy — we are your long-term partner in growth.</p>
      <a href="/about" class="btn btn-gold" style="margin-top:20px;">Learn More About Us</a>
    </div>
  </div>
</section>

<!-- ═══ SERVICES ═══ -->
<style>
/* ── SERVICES SECTION REDESIGN ── */
.ip-svc-section {
  background: var(--navy);
  padding: 110px 5%;
  position: relative;
  overflow: hidden;
}
.ip-svc-section::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(212,164,55,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,164,55,0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}
.ip-svc-inner { position: relative; z-index: 2; }

/* Header row */
.ip-svc-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  margin-bottom: 64px;
  flex-wrap: wrap;
}
.ip-svc-head-left .section-tag { color: var(--gold); margin-bottom: 14px; }
.ip-svc-head-left .section-title { color: #fff; }
.ip-svc-head-left .section-title em { color: var(--gold); }
.ip-svc-head-left p {
  font-size: 15px; color: rgba(255,255,255,0.48);
  line-height: 1.8; margin-top: 14px; max-width: 500px;
}
.ip-svc-all-link {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 12px 26px;
  border: 1px solid rgba(212,164,55,0.4);
  color: var(--gold); border-radius: 6px;
  font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
  text-decoration: none; white-space: nowrap;
  transition: all 0.22s;
}
.ip-svc-all-link:hover { background: var(--gold); color: var(--navy); border-color: var(--gold); }

/* 3-column grid */
.ip-svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Individual card */
.ip-svc-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.38s cubic-bezier(0.4,0,0.2,1),
              border-color 0.3s,
              box-shadow 0.38s;
}
.ip-svc-card:hover {
  transform: translateY(-8px);
  border-color: rgba(212,164,55,0.4);
  box-shadow: 0 32px 72px rgba(0,0,0,0.5);
}

/* ── IMAGE AREA ── */
.ip-svc-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}
.ip-svc-img img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.55s cubic-bezier(0.4,0,0.2,1);
  filter: brightness(0.88) saturate(1.1);
}
.ip-svc-card:hover .ip-svc-img img {
  transform: scale(1.07);
  filter: brightness(0.95) saturate(1.15);
}

/* Dark gradient fade at bottom of image */
.ip-svc-img-fade {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 90px; z-index: 1;
  background: linear-gradient(to top, var(--navy) 0%, transparent 100%);
}

/* Number badge — top left of image */
.ip-svc-num {
  position: absolute; top: 16px; left: 16px; z-index: 3;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(11,31,58,0.82);
  border: 1.5px solid rgba(212,164,55,0.55);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-cormorant),'Cormorant Garamond',serif;
  font-size: 14px; font-weight: 700; color: var(--gold);
  backdrop-filter: blur(6px);
}

/* Gold icon chip — bottom right of image */
.ip-svc-chip {
  position: absolute; bottom: 18px; right: 18px; z-index: 3;
  width: 44px; height: 44px; border-radius: 12px;
  background: var(--gold);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  box-shadow: 0 4px 18px rgba(212,164,55,0.45);
  transition: transform 0.25s;
}
.ip-svc-card:hover .ip-svc-chip { transform: scale(1.1) rotate(-4deg); }

/* Top gold accent line — reveals on hover */
.ip-svc-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 4;
  background: linear-gradient(90deg, var(--gold), rgba(212,164,55,0.3), transparent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.38s ease;
}
.ip-svc-card:hover::before { transform: scaleX(1); }

/* ── CARD BODY ── */
.ip-svc-body { padding: 26px 28px 30px; }

.ip-svc-body h3 {
  font-family: var(--font-cormorant),'Cormorant Garamond',serif;
  font-size: 22px; font-weight: 600; color: #fff;
  line-height: 1.18; margin-bottom: 10px;
}
.ip-svc-body p {
  font-size: 13.5px; color: rgba(255,255,255,0.48);
  line-height: 1.78; margin-bottom: 18px;
}

/* Bullet list */
.ip-svc-list {
  list-style: none; display: flex; flex-direction: column; gap: 7px;
  margin-bottom: 22px;
}
.ip-svc-list li {
  font-size: 12.5px; color: rgba(255,255,255,0.42);
  display: flex; align-items: flex-start; gap: 9px; line-height: 1.5;
}
.ip-svc-list li::before {
  content: '→'; color: var(--gold); font-size: 11px;
  flex-shrink: 0; margin-top: 2px;
}

/* Learn More arrow link */
.ip-svc-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12.5px; font-weight: 700; color: var(--gold);
  letter-spacing: 0.8px; text-decoration: none; text-transform: uppercase;
  transition: gap 0.22s;
}
.ip-svc-link:hover { gap: 14px; color: var(--gold-light); }
.ip-svc-link-circle {
  width: 26px; height: 26px; border-radius: 50%;
  border: 1px solid rgba(212,164,55,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; transition: background 0.22s, border-color 0.22s;
}
.ip-svc-card:hover .ip-svc-link-circle {
  background: var(--gold); border-color: var(--gold); color: var(--navy);
}

/* Divider line above link */
.ip-svc-divider {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, rgba(212,164,55,0.2), transparent);
  margin-bottom: 20px;
}

/* CTA row below grid */
.ip-svc-cta-row {
  text-align: center; margin-top: 56px;
}

/* Responsive */
@media (max-width: 1100px) { .ip-svc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 680px)  { .ip-svc-grid { grid-template-columns: 1fr; } .ip-svc-head { flex-direction: column; align-items: flex-start; } }
</style>

<section class="ip-svc-section fade-in">
  <div class="ip-svc-inner">

    <!-- Section header -->
    <div class="ip-svc-head">
      <div class="ip-svc-head-left">
        <div class="section-tag">What We Offer</div>
        <h2 class="section-title">Comprehensive <em>Trade Services</em></h2>
        <p>From business formation to customs clearance and freight — we handle every aspect of your global trade journey so you can focus on growth.</p>
      </div>
      <a href="/services" class="ip-svc-all-link">View All Services &nbsp;→</a>
    </div>

    <!-- Cards grid -->
    <div class="ip-svc-grid">

      <!-- 1. Customs Clearance -->
      <div class="ip-svc-card">
        <div class="ip-svc-img">
          <img loading="lazy" src="/images/Custome_clearance.webp" alt="Customs Clearance">
          <div class="ip-svc-img-fade"></div>
          <div class="ip-svc-num">01</div>
          <div class="ip-svc-chip">🛃</div>
        </div>
        <div class="ip-svc-body">
          <h3>Customs Clearance</h3>
          <p>Comprehensive clearance for all product types — timely, compliant, hassle-free cargo processing in Pakistan &amp; worldwide.</p>
          <ul class="ip-svc-list">
            <li>GD Filing &amp; Documentation</li>
            <li>Duties, Tariffs &amp; Tax Management</li>
            <li>Import &amp; Export Clearance</li>
          </ul>
          <div class="ip-svc-divider"></div>
          <a href="/services" class="ip-svc-link">Learn More <span class="ip-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 2. Freight Forwarding & Logistics -->
      <div class="ip-svc-card">
        <div class="ip-svc-img">
          <img loading="lazy" src="/images/Freight_Forwarding___Logistics.webp" alt="Freight Forwarding & Logistics">
          <div class="ip-svc-img-fade"></div>
          <div class="ip-svc-num">02</div>
          <div class="ip-svc-chip">🚢</div>
        </div>
        <div class="ip-svc-body">
          <h3>Freight Forwarding &amp; Logistics</h3>
          <p>End-to-end shipping ensuring safe, efficient, on-time movement of goods worldwide via air, sea, road or rail.</p>
          <ul class="ip-svc-list">
            <li>International Freight – LCL &amp; FCL</li>
            <li>Air, Sea, Train &amp; Road Transport</li>
            <li>Door-to-Door &amp; Real-Time Tracking</li>
          </ul>
          <div class="ip-svc-divider"></div>
          <a href="/services" class="ip-svc-link">Learn More <span class="ip-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 3. Business Registration -->
      <div class="ip-svc-card">
        <div class="ip-svc-img">
          <img loading="lazy" src="/images/Business_Registration.webp" alt="Business Registration">
          <div class="ip-svc-img-fade"></div>
          <div class="ip-svc-num">03</div>
          <div class="ip-svc-chip">🏢</div>
        </div>
        <div class="ip-svc-body">
          <h3>Business Registration</h3>
          <p>One-window solution to register your business with all relevant institutions, trade bodies and licensing authorities.</p>
          <ul class="ip-svc-list">
            <li>Sole Proprietor to Pvt. Ltd. Registration</li>
            <li>NTN, PSW, WEBOC Setup</li>
            <li>Trademark &amp; ISO Certifications</li>
          </ul>
          <div class="ip-svc-divider"></div>
          <a href="/services" class="ip-svc-link">Learn More <span class="ip-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 4. Tax & Legal Services -->
      <div class="ip-svc-card">
        <div class="ip-svc-img">
          <img loading="lazy" src="/images/Tax___Legal_Services.webp" alt="Tax & Legal Services">
          <div class="ip-svc-img-fade"></div>
          <div class="ip-svc-num">04</div>
          <div class="ip-svc-chip">⚖️</div>
        </div>
        <div class="ip-svc-body">
          <h3>Tax &amp; Legal Services</h3>
          <p>Reliable tax and legal solutions to help businesses stay fully compliant with national and international regulations.</p>
          <ul class="ip-svc-list">
            <li>Income &amp; Sales Tax Returns</li>
            <li>FBR Notices, Audits &amp; Appeals</li>
            <li>Contract Drafting &amp; Review</li>
          </ul>
          <div class="ip-svc-divider"></div>
          <a href="/services" class="ip-svc-link">Learn More <span class="ip-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 5. Business Consultancy (Training & Development) -->
      <div class="ip-svc-card">
        <div class="ip-svc-img">
          <img loading="lazy" src="/images/Business_Consultancy.webp" alt="Business Consultancy & Training">
          <div class="ip-svc-img-fade"></div>
          <div class="ip-svc-num">05</div>
          <div class="ip-svc-chip">💡</div>
        </div>
        <div class="ip-svc-body">
          <h3>Training &amp; Development</h3>
          <p>Bridging academia and industry through practical certifications, workshops, and expert-led sessions for professionals.</p>
          <ul class="ip-svc-list">
            <li>Certifications in Import-Export</li>
            <li>Workshops &amp; Seminars</li>
            <li>Internship Opportunities</li>
          </ul>
          <div class="ip-svc-divider"></div>
          <a href="/training" class="ip-svc-link">Learn More <span class="ip-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 6. Branding & Support Services -->
      <div class="ip-svc-card">
        <div class="ip-svc-img">
          <img loading="lazy" src="/images/Branding_and_Support_Services.webp" alt="Branding & Support Services">
          <div class="ip-svc-img-fade"></div>
          <div class="ip-svc-num">06</div>
          <div class="ip-svc-chip">🎨</div>
        </div>
        <div class="ip-svc-body">
          <h3>Branding &amp; Support</h3>
          <p>Comprehensive back-office and trade-related support — keeping your business running efficiently, compliantly, and professionally.</p>
          <ul class="ip-svc-list">
            <li>Logo, Letterhead &amp; Card Design</li>
            <li>Business Plans &amp; Feasibilities</li>
            <li>Social Media &amp; IT Services</li>
          </ul>
          <div class="ip-svc-divider"></div>
          <a href="/services" class="ip-svc-link">Learn More <span class="ip-svc-link-circle">→</span></a>
        </div>
      </div>

    </div>

    <!-- CTA -->
    <div class="ip-svc-cta-row">
      <a href="/services" class="btn btn-gold">View All Services</a>
    </div>

  </div>
</section>

<!-- ═══ WHY CHOOSE ═══ -->
<section class="section section-dark fade-in">
  <div class="dark-grid-bg"></div>
  <div style="position:relative;z-index:2;">
    <div style="max-width:560px;margin-bottom:0;">
      <div class="section-tag" style="color:var(--gold)">Why Impex-Pro</div>
      <h2 class="section-title light">Built for <em>Global Success</em></h2>
      <p style="font-size:16px;color:rgba(255,255,255,0.55);line-height:1.75;margin-top:16px;">We combine deep industry expertise with a client-first philosophy to deliver results that exceed expectations — every time.</p>
    </div>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon">🎯</div><h3>Expertise &amp; Experience</h3><p>15+ years of hands-on experience in import-export, customs, and business development.</p></div>
      <div class="why-card"><div class="why-icon">🔗</div><h3>Comprehensive Coverage</h3><p>From registration to logistics — a true one-window solution eliminating multiple providers.</p></div>
      <div class="why-card"><div class="why-icon">🧭</div><h3>Tailored Approach</h3><p>Personalized consultancy designed around your specific goals and market context.</p></div>
      <div class="why-card"><div class="why-icon">🤝</div><h3>Long-Term Partnership</h3><p>Your strategic partner committed to sustained growth and global competitiveness.</p></div>
      <div class="why-card"><div class="why-icon">🌐</div><h3>Global Market Access</h3><p>Leverage our networks to access international markets and expand with confidence.</p></div>
      <div class="why-card"><div class="why-icon">📈</div><h3>Proven Track Record</h3><p>400+ individuals trained, 10+ businesses launched — real-world impact and transformation.</p></div>
    </div>
  </div>
</section>

<!-- ═══ TESTIMONIALS ═══ -->
<section class="section section-dark fade-in" style="background:var(--navy);border-top:1px solid rgba(255,255,255,0.05);">
  <div class="dark-grid-bg"></div>
  <div style="position:relative;z-index:2;">
    <div class="testi-header">
      <div>
        <div class="section-tag" style="color:var(--gold)">Client Testimonials</div>
        <h2 class="section-title light">What Our <em>Clients Say</em></h2>
      </div>
      <div class="testi-nav">
        <button class="testi-btn" id="testiPrev">&#8592;</button>
        <button class="testi-btn" id="testiNext">&#8594;</button>
      </div>
    </div>
    <div class="testi-track-wrap">
      <div class="testi-track">
        <div class="testi-card"><div class="testi-quote">&ldquo;</div><div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><p class="testi-text">"Impex-Pro transformed our export journey from scratch. Faheem sahib and his team handled our WEBOC registration, customs documentation, and first shipment with remarkable professionalism."</p><div class="testi-author"><div class="testi-avatar">AK</div><div><div class="testi-name">Ahmed Karim</div><div class="testi-role">CEO &amp; Founder</div><div class="testi-company">AK Agro Exports, Lahore</div></div></div></div>
        <div class="testi-card"><div class="testi-quote">&ldquo;</div><div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><p class="testi-text">"The training program at Impex-Pro was a game-changer for me. As a fresh graduate, I launched my own trading business within 4 months. The certification and mentorship are world-class."</p><div class="testi-author"><div class="testi-avatar">SR</div><div><div class="testi-name">Sana Rehman</div><div class="testi-role">Entrepreneur &amp; Trainee Alumni</div><div class="testi-company">SRG Trading Company, Islamabad</div></div></div></div>
        <div class="testi-card"><div class="testi-quote">&ldquo;</div><div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><p class="testi-text">"Our customs clearance was stuck for weeks before we approached Impex-Pro. Their team resolved everything within 48 hours — documentation, duties, compliance. They are true experts."</p><div class="testi-author"><div class="testi-avatar">MF</div><div><div class="testi-name">Muhammad Farooq</div><div class="testi-role">Director Operations</div><div class="testi-company">PakMineral Resources Ltd.</div></div></div></div>
        <div class="testi-card"><div class="testi-quote">&ldquo;</div><div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><p class="testi-text">"From company registration to obtaining our import license and setting up our FBR profile — Impex-Pro handled everything seamlessly. Their one-window approach saved us months of hassle."</p><div class="testi-author"><div class="testi-avatar">ZN</div><div><div class="testi-name">Zainab Nawaz</div><div class="testi-role">Managing Director</div><div class="testi-company">ZN Global Trade, Faisalabad</div></div></div></div>
        <div class="testi-card"><div class="testi-quote">&ldquo;</div><div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><p class="testi-text">"I attended Impex-Pro's workshop on export documentation and it was incredibly practical. Mr. Faheem's real-world experience shines through every session. My team learned more in 2 days than months of self-study."</p><div class="testi-author"><div class="testi-avatar">TH</div><div><div class="testi-name">Tariq Hussain</div><div class="testi-role">Business Development Manager</div><div class="testi-company">Punjab Textile Mills</div></div></div></div>
        <div class="testi-card"><div class="testi-quote">&ldquo;</div><div class="testi-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><p class="testi-text">"Impex-Pro's freight forwarding service is exceptional. They arranged LCL shipments for our chemical exports at very competitive rates with zero delays. Their global coordination is outstanding."</p><div class="testi-author"><div class="testi-avatar">OB</div><div><div class="testi-name">Omar Baig</div><div class="testi-role">Export Manager</div><div class="testi-company">Chemex Industries, Karachi</div></div></div></div>
      </div>
    </div>
    <div class="testi-dots"></div>
  </div>
</section>

<!-- ═══ CTA ═══ -->
<section class="section cta-section fade-in">
  <div class="cta-inner">
    <h2>Ready to <em>Expand Your Business</em> Globally?</h2>
    <p>Partner with Impex-Pro and gain the strategic guidance, trade expertise, and end-to-end support you need to succeed in the international marketplace.</p>
    <div class="cta-btns">
      <a href="/contact" class="btn btn-gold">Request a Quote</a>
      <a href="tel:+923032708008" class="btn btn-outline-white">Call Us Now</a>
    </div>
  </div>
</section>

<!-- ═══ FOOTER ═══ -->
<!-- WhatsApp FAB -->`;

export const aboutHtml = `<div class="page-hero">
  <div class="page-hero-bg-pattern"></div>
  <div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <nav class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">›</span><span>About</span></nav>
    <div class="section-tag">About Impex-Pro</div>
    <h1>Your Trusted <em>Global Trade</em> Partner</h1>
    <p class="page-hero-desc">Founded on expertise, driven by results — Impex-Pro is Pakistan's premier one-window trade consultancy, empowering businesses to grow globally with confidence.</p>
  </div>
</div>

<section class="section fade-in" style="background:var(--off-white);">
  <div class="about-grid">
    <div class="about-visual">
      <div class="about-card">
        <p class="about-card-quote">"Our mission is to bridge the gap between ambition and execution through strategic consultancy, practical training, and dedicated end-to-end support."</p>
        <div class="about-card-name">Muhammad Faheem Akhtar</div>
        <div class="about-card-title">Founder &amp; CEO · Impex-Pro Business Consultant</div>
        <div class="about-float"><div class="about-float-num">400+</div><div class="about-float-lbl">Trained</div></div>
      </div>
      <div class="about-img-wrap"><img loading="lazy" src="/images/aboutVisual.png" alt="About Impex-Pro"></div>
    </div>
    <div class="about-text">
      <div class="section-tag">Who We Are</div>
      <h2 class="section-title">One Window. <em>Endless Possibilities.</em></h2>
      <p>Impex-Pro Business Consultant, founded and led by <strong>Muhammad Faheem Akhtar</strong>, is a dynamic consultancy firm offering <strong>One-Window Solutions</strong> for entrepreneurs, startups, and growing businesses aiming to thrive in today's competitive global trade environment.</p>
      <p>With extensive hands-on experience in import–export and business development, Impex-Pro provides end-to-end support to help businesses formalize, scale, and expand into international markets with confidence.</p>
      <p>Our mission is to bridge the gap between ambition and execution by offering strategic consultancy, practical training, and dedicated support tailored to the unique needs of each client. Whether you are launching a new venture, scaling an existing operation, or transitioning from an informal setup to a compliant business entity, Impex-Pro ensures that your journey is smooth, compliant, and growth-oriented.</p>
      <p>What sets us apart is our deep understanding of international trade dynamics, regulatory landscapes, and market trends. Driven by a client-centric philosophy, Impex-Pro is more than a consultancy — we are your long-term partner in growth.</p>
    </div>
  </div>
</section>

<section class="section section-dark fade-in">
  <div class="dark-grid-bg"></div>
  <div style="position:relative;z-index:2;">
    <div class="section-tag" style="color:var(--gold)">Our Values</div>
    <h2 class="section-title light">What We <em>Stand For</em></h2>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon">🎯</div><h3>Integrity</h3><p>We conduct every engagement with full transparency, honesty, and ethical standards — building trust that lasts.</p></div>
      <div class="why-card"><div class="why-icon">🌐</div><h3>Global Mindset</h3><p>We think beyond borders — connecting Pakistani businesses with global opportunities and international best practices.</p></div>
      <div class="why-card"><div class="why-icon">💡</div><h3>Innovation</h3><p>Continuously evolving our services and methodologies to stay ahead in a dynamic trade landscape.</p></div>
      <div class="why-card"><div class="why-icon">🤝</div><h3>Client First</h3><p>Every decision we make is guided by what creates the most value and impact for our clients' businesses.</p></div>
      <div class="why-card"><div class="why-icon">📈</div><h3>Excellence</h3><p>Delivering the highest quality outcomes — from documentation to delivery, every single time.</p></div>
      <div class="why-card"><div class="why-icon">🤲</div><h3>Empowerment</h3><p>We empower individuals and businesses with the knowledge, tools, and confidence to achieve lasting success.</p></div>
    </div>
  </div>
</section>

<section class="section cta-section fade-in">
  <div class="cta-inner">
    <h2>Let's <em>Work Together</em></h2>
    <p>Reach out to Impex-Pro today and discover how our expertise can accelerate your business growth in global trade.</p>
    <div class="cta-btns">
      <a href="/contact" class="btn btn-gold">Get in Touch</a>
      <a href="/team" class="btn btn-outline-white">Meet the Team</a>
    </div>
  </div>
</section>`;

export const servicesHtml = `<div class="page-hero">
  <div class="page-hero-bg-pattern"></div><div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <nav class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">›</span><span>Services</span></nav>
    <div class="section-tag">What We Offer</div>
    <h1>Comprehensive <em>Trade Services</em></h1>
    <p class="page-hero-desc">From business formation to customs clearance and freight — we handle every aspect of your global trade journey so you can focus on growth.</p>
  </div>
</div>

<!-- SERVICES GRID — photo-card style matching home page -->
<style>
/* ── SERVICES PAGE GRID ── */
.sp-svc-section {
  background: var(--navy);
  padding: 84px 5% 110px;
  position: relative;
  overflow: hidden;
}
.sp-svc-section::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(212,164,55,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,164,55,0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}
.sp-svc-inner { position: relative; z-index: 2; max-width: 1320px; margin: 0 auto; }
.sp-svc-head {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 32px; margin-bottom: 64px; flex-wrap: wrap;
}
.sp-svc-head-left .section-tag { color: var(--gold); margin-bottom: 14px; }
.sp-svc-head-left .section-title { color: #fff; }
.sp-svc-head-left .section-title em { color: var(--gold); }
.sp-svc-head-left p { font-size: 15px; color: rgba(255,255,255,0.48); line-height: 1.8; margin-top: 14px; max-width: 500px; }

.sp-svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.sp-svc-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.38s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.38s;
}
.sp-svc-card:hover {
  transform: translateY(-8px);
  border-color: rgba(212,164,55,0.4);
  box-shadow: 0 32px 72px rgba(0,0,0,0.5);
}
.sp-svc-img { position: relative; height: 220px; overflow: hidden; }
.sp-svc-img img {
  width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;
  transition: transform 0.55s cubic-bezier(0.4,0,0.2,1);
  filter: brightness(0.88) saturate(1.1);
}
.sp-svc-card:hover .sp-svc-img img { transform: scale(1.07); filter: brightness(0.95) saturate(1.15); }
.sp-svc-img-fade {
  position: absolute; bottom: 0; left: 0; right: 0; height: 90px; z-index: 1;
  background: linear-gradient(to top, var(--navy) 0%, transparent 100%);
}
.sp-svc-num {
  position: absolute; top: 16px; left: 16px; z-index: 3;
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(11,31,58,0.82); border: 1.5px solid rgba(212,164,55,0.55);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-cormorant),'Cormorant Garamond',serif; font-size: 14px; font-weight: 700; color: var(--gold);
  backdrop-filter: blur(6px);
}
.sp-svc-chip {
  position: absolute; bottom: 18px; right: 18px; z-index: 3;
  width: 44px; height: 44px; border-radius: 12px;
  background: var(--gold); display: flex; align-items: center; justify-content: center;
  font-size: 20px; box-shadow: 0 4px 18px rgba(212,164,55,0.45); transition: transform 0.25s;
}
.sp-svc-card:hover .sp-svc-chip { transform: scale(1.1) rotate(-4deg); }
.sp-svc-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 4;
  background: linear-gradient(90deg, var(--gold), rgba(212,164,55,0.3), transparent);
  transform: scaleX(0); transform-origin: left; transition: transform 0.38s ease;
}
.sp-svc-card:hover::before { transform: scaleX(1); }
.sp-svc-body { padding: 26px 28px 30px; }
.sp-svc-body h3 {
  font-family: var(--font-cormorant),'Cormorant Garamond',serif;
  font-size: 22px; font-weight: 600; color: #fff; line-height: 1.18; margin-bottom: 10px;
}
.sp-svc-body p { font-size: 13.5px; color: rgba(255,255,255,0.48); line-height: 1.78; margin-bottom: 18px; }
.sp-svc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; margin-bottom: 22px; }
.sp-svc-list li { font-size: 12.5px; color: rgba(255,255,255,0.42); display: flex; align-items: flex-start; gap: 9px; line-height: 1.5; }
.sp-svc-list li::before { content: '→'; color: var(--gold); font-size: 11px; flex-shrink: 0; margin-top: 2px; }
.sp-svc-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12.5px; font-weight: 700; color: var(--gold);
  letter-spacing: 0.8px; text-decoration: none; text-transform: uppercase; transition: gap 0.22s;
}
.sp-svc-link:hover { gap: 14px; color: var(--gold-light); }
.sp-svc-link-circle {
  width: 26px; height: 26px; border-radius: 50%;
  border: 1px solid rgba(212,164,55,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; transition: background 0.22s, border-color 0.22s;
}
.sp-svc-card:hover .sp-svc-link-circle { background: var(--gold); border-color: var(--gold); color: var(--navy); }
.sp-svc-divider { width: 100%; height: 1px; background: linear-gradient(90deg, rgba(212,164,55,0.2), transparent); margin-bottom: 20px; }
@media (max-width: 1100px) { .sp-svc-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 680px)  { .sp-svc-grid { grid-template-columns: 1fr; } .sp-svc-head { flex-direction: column; align-items: flex-start; } }
</style>

<section class="sp-svc-section fade-in">
  <div class="sp-svc-inner">
    <div class="sp-svc-grid">

      <!-- 1 -->
      <div class="sp-svc-card">
        <div class="sp-svc-img">
          <img loading="lazy" src="/images/Custome_clearance.webp" alt="Customs Clearance">
          <div class="sp-svc-img-fade"></div>
          <div class="sp-svc-num">01</div>
          <div class="sp-svc-chip">🛃</div>
        </div>
        <div class="sp-svc-body">
          <h3>Customs Clearance in Pakistan &amp; Worldwide</h3>
          <p>Comprehensive clearance for all product types — timely, compliant, hassle-free cargo processing in Pakistan &amp; worldwide.</p>
          <ul class="sp-svc-list">
            <li>Customs Documentation &amp; GD Filing</li>
            <li>Duties, Tariffs &amp; Tax Management</li>
            <li>Import &amp; Export Clearance</li>
            <li>Global Customs Coordination</li>
            <li>Timely &amp; Hassle-Free Processing</li>
            <li>End-to-End Support</li>
          </ul>
          <div class="sp-svc-divider"></div>
          <a href="/contact" class="sp-svc-link">Get a Quote <span class="sp-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 2 -->
      <div class="sp-svc-card">
        <div class="sp-svc-img">
          <img loading="lazy" src="/images/Freight_Forwarding___Logistics.webp" alt="Freight Forwarding & Logistics">
          <div class="sp-svc-img-fade"></div>
          <div class="sp-svc-num">02</div>
          <div class="sp-svc-chip">🚢</div>
        </div>
        <div class="sp-svc-body">
          <h3>Shipping, Logistics &amp; Transportation</h3>
          <p>End-to-end shipping ensuring safe, efficient, on-time movement of goods worldwide via air, sea, road or rail.</p>
          <ul class="sp-svc-list">
            <li>International Freight Forwarding – LCL &amp; FCL</li>
            <li>Bulk &amp; Project Cargo Shipping</li>
            <li>Air, Sea, Train &amp; Road Transport</li>
            <li>Port-to-Port &amp; Door-to-Door</li>
            <li>Real-Time Tracking &amp; Cargo Safety</li>
          </ul>
          <div class="sp-svc-divider"></div>
          <a href="/contact" class="sp-svc-link">Get a Quote <span class="sp-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 3 -->
      <div class="sp-svc-card">
        <div class="sp-svc-img">
          <img loading="lazy" src="/images/Business_Registration.webp" alt="Business Registration">
          <div class="sp-svc-img-fade"></div>
          <div class="sp-svc-num">03</div>
          <div class="sp-svc-chip">🏢</div>
        </div>
        <div class="sp-svc-body">
          <h3>Business Registration (Start, Grow &amp; Expand)</h3>
          <p>Complete one-window solution to register your business with all relevant institutions, trade bodies and licensing authorities.</p>
          <ul class="sp-svc-list">
            <li>Company Registration (Sole Proprietor to Pvt Ltd)</li>
            <li>Business NTN &amp; Sales Tax Registration</li>
            <li>PSW, WEBOC, Chamber of Commerce</li>
            <li>IPO, Trademark &amp; ISO Certifications</li>
          </ul>
          <div class="sp-svc-divider"></div>
          <a href="/contact" class="sp-svc-link">Get a Quote <span class="sp-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 4 -->
      <div class="sp-svc-card">
        <div class="sp-svc-img">
          <img loading="lazy" src="/images/Tax___Legal_Services.webp" alt="Tax & Legal Services">
          <div class="sp-svc-img-fade"></div>
          <div class="sp-svc-num">04</div>
          <div class="sp-svc-chip">⚖️</div>
        </div>
        <div class="sp-svc-body">
          <h3>Tax &amp; Legal Services</h3>
          <p>Reliable tax and legal solutions helping businesses stay fully compliant with national and international regulations.</p>
          <ul class="sp-svc-list">
            <li>Income Tax &amp; Sales Tax Returns</li>
            <li>FBR Notices, Audits &amp; Appeals</li>
            <li>Legal Documentation &amp; Contract Drafting</li>
            <li>Dispute Resolution &amp; Arbitration</li>
          </ul>
          <div class="sp-svc-divider"></div>
          <a href="/contact" class="sp-svc-link">Get a Quote <span class="sp-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 5 -->
      <div class="sp-svc-card">
        <div class="sp-svc-img">
          <img loading="lazy" src="/images/Business_Consultancy.webp" alt="Training & Development">
          <div class="sp-svc-img-fade"></div>
          <div class="sp-svc-num">05</div>
          <div class="sp-svc-chip">💡</div>
        </div>
        <div class="sp-svc-body">
          <h3>Training &amp; Development Programs</h3>
          <p>Bridging academia and industry through practical certifications, workshops, and expert-led sessions for professionals.</p>
          <ul class="sp-svc-list">
            <li>Practical Training &amp; Certifications</li>
            <li>Workshops &amp; Seminars</li>
            <li>Internship Opportunities</li>
            <li>Research &amp; Industry Collaboration</li>
            <li>Expert Sessions with Industry Leaders</li>
          </ul>
          <div class="sp-svc-divider"></div>
          <a href="/training" class="sp-svc-link">View Training <span class="sp-svc-link-circle">→</span></a>
        </div>
      </div>

      <!-- 6 -->
      <div class="sp-svc-card">
        <div class="sp-svc-img">
          <img loading="lazy" src="/images/Branding_and_Support_Services.webp" alt="Branding & Support Services">
          <div class="sp-svc-img-fade"></div>
          <div class="sp-svc-num">06</div>
          <div class="sp-svc-chip">🎨</div>
        </div>
        <div class="sp-svc-body">
          <h3>Branding &amp; Support Services</h3>
          <p>Comprehensive back-office and trade-related support — keeping your business running efficiently, compliantly, and professionally.</p>
          <ul class="sp-svc-list">
            <li>Logo, Letterhead &amp; Business Card Design</li>
            <li>Trademark &amp; Copyright Filing</li>
            <li>Business Plans &amp; Feasibility Studies</li>
            <li>Social Media &amp; IT Services (ERP, CRM)</li>
          </ul>
          <div class="sp-svc-divider"></div>
          <a href="/contact" class="sp-svc-link">Get a Quote <span class="sp-svc-link-circle">→</span></a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- PROCESS -->
<section class="section fade-in" style="background:var(--off-white);">
  <div class="section-tag">How We Work</div>
  <h2 class="section-title">Our <em>Trade Process</em></h2>
  <p style="font-size:16px;color:var(--text-mid);margin-top:16px;max-width:600px;line-height:1.75;">A streamlined, transparent process that takes you from initial consultation to successful delivery — with expert guidance at every step.</p>
  <div class="process-steps">
    <div class="process-line"></div>
    <div class="process-step"><div class="step-num">01</div><div class="step-body"><h3>Initial Consultation</h3><p>We begin with a thorough consultation to understand your business goals, product type, target markets, and compliance requirements.</p></div></div>
    <div class="process-step"><div class="step-num">02</div><div class="step-body"><h3>Documentation &amp; Registration</h3><p>Our team handles all documentation — business registration, licenses, NTN, WEBOC, and import/export permits with precision.</p></div></div>
    <div class="process-step"><div class="step-num">03</div><div class="step-body"><h3>Customs Clearance</h3><p>Expert management of customs procedures, GD filing, duties, tariffs, and regulatory compliance for seamless cargo clearance.</p></div></div>
    <div class="process-step"><div class="step-num">04</div><div class="step-body"><h3>Freight &amp; Shipping</h3><p>Coordinating the movement of your goods via the most optimal route — air, sea, road or rail — with full tracking and insurance.</p></div></div>
    <div class="process-step"><div class="step-num">05</div><div class="step-body"><h3>Delivery &amp; Follow-up</h3><p>Safe delivery to the final destination with post-shipment support, tax documentation, and ongoing advisory for your next trade.</p></div></div>
  </div>
</section>

<!-- INDUSTRIES -->
<style>
.ind-section {
  background: var(--navy);
  padding: 110px 5%;
  position: relative;
  overflow: hidden;
}
.ind-section::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(212,164,55,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(212,164,55,0.035) 1px, transparent 1px);
  background-size: 56px 56px;
  pointer-events: none;
}
.ind-section::after {
  content: '';
  position: absolute;
  top: -160px; right: -160px;
  width: 520px; height: 520px;
  background: radial-gradient(circle, rgba(212,164,55,0.07) 0%, transparent 70%);
  pointer-events: none;
}
.ind-inner { position: relative; z-index: 2; max-width: 1320px; margin: 0 auto; }
.ind-header { text-align: center; margin-bottom: 72px; }
.ind-header .section-tag { color: var(--gold); margin-bottom: 14px; }
.ind-header .section-title { color: #fff; }
.ind-header .section-title em { color: var(--gold); }
.ind-header p { font-size: 15px; color: rgba(255,255,255,0.48); line-height: 1.8; margin-top: 16px; max-width: 600px; margin-left: auto; margin-right: auto; }

/* Gold divider line */
.ind-header-line {
  display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 28px;
}
.ind-header-line span { display: block; height: 1px; width: 80px; background: linear-gradient(90deg, transparent, var(--gold)); }
.ind-header-line span:last-child { background: linear-gradient(90deg, var(--gold), transparent); }
.ind-header-line i { display: block; width: 8px; height: 8px; background: var(--gold); transform: rotate(45deg); }

/* Grid */
.ind-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}
.ind-card {
  position: relative;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 28px 16px 24px;
  text-align: center;
  cursor: default;
  overflow: hidden;
  transition: transform 0.32s cubic-bezier(0.4,0,0.2,1),
              border-color 0.3s,
              box-shadow 0.32s,
              background 0.3s;
}
.ind-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--gold), rgba(212,164,55,0.2), transparent);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s ease;
}
.ind-card:hover::before { transform: scaleX(1); }
.ind-card:hover {
  transform: translateY(-7px);
  border-color: rgba(212,164,55,0.35);
  background: rgba(212,164,55,0.05);
  box-shadow: 0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,164,55,0.12);
}
.ind-card-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(212,164,55,0.08) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.3s;
}
.ind-card:hover .ind-card-glow { opacity: 1; }
.ind-icon-wrap {
  width: 60px; height: 60px; border-radius: 16px;
  background: rgba(212,164,55,0.1);
  border: 1px solid rgba(212,164,55,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; margin: 0 auto 16px;
  transition: background 0.3s, border-color 0.3s, transform 0.3s;
}
.ind-card:hover .ind-icon-wrap {
  background: var(--gold);
  border-color: var(--gold);
  transform: scale(1.1) rotate(-4deg);
}
.ind-card span {
  display: block;
  font-family: var(--font-outfit),'Outfit',sans-serif;
  font-size: 13px; font-weight: 600;
  color: rgba(255,255,255,0.65);
  letter-spacing: 0.3px;
  line-height: 1.35;
  transition: color 0.3s;
}
.ind-card:hover span { color: #fff; }

/* Counter strip */
.ind-stats {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px;
  background: rgba(212,164,55,0.12);
  border: 1px solid rgba(212,164,55,0.15);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 64px;
}
.ind-stat {
  background: rgba(11,31,58,0.9);
  padding: 28px 20px;
  text-align: center;
}
.ind-stat-num {
  font-family: var(--font-cormorant),'Cormorant Garamond',serif;
  font-size: 42px; font-weight: 700; color: var(--gold);
  line-height: 1;
}
.ind-stat-label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 6px; letter-spacing: 0.3px; }

@media (max-width: 1100px) { .ind-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 680px)  { .ind-grid { grid-template-columns: repeat(2, 1fr); } .ind-stats { grid-template-columns: 1fr; } }
</style>

<section class="ind-section fade-in">
  <div class="ind-inner">
    <div class="ind-header">
      <div class="section-tag">Industries We Serve</div>
      <h2 class="section-title">Across <em>Every Sector</em></h2>
      <p>Impex-Pro has deep expertise in customs, logistics, and trade consultancy across a wide range of industries and commodity types.</p>
      <div class="ind-header-line"><span></span><i></i><span></span></div>
    </div>

    <div class="ind-grid">
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">🌾</div>
        <span>Agriculture</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">⛏️</div>
        <span>Minerals &amp; Salt</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">👕</div>
        <span>Textiles</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">⚙️</div>
        <span>Machinery</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">🧪</div>
        <span>Chemicals</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">🍎</div>
        <span>Food Products</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">🌱</div>
        <span>Fertilizers</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">💊</div>
        <span>Pharmaceuticals</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">🏗️</div>
        <span>Construction</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">⚡</div>
        <span>Energy</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">🛢️</div>
        <span>Oils &amp; Fats</span>
      </div>
      <div class="ind-card">
        <div class="ind-card-glow"></div>
        <div class="ind-icon-wrap">📦</div>
        <span>Raw Materials</span>
      </div>
    </div>

    <div class="ind-stats">
      <div class="ind-stat">
        <div class="ind-stat-num">12+</div>
        <div class="ind-stat-label">Industries Covered</div>
      </div>
      <div class="ind-stat">
        <div class="ind-stat-num">500+</div>
        <div class="ind-stat-label">Clients Served</div>
      </div>
      <div class="ind-stat">
        <div class="ind-stat-num">10+</div>
        <div class="ind-stat-label">Years of Expertise</div>
      </div>
    </div>

  </div>
</section>

<section class="section cta-section fade-in">
  <div class="cta-inner">
    <h2>Ready to Get <em>Started?</em></h2>
    <p>Contact us today for a free consultation and let our experts guide you through the right services for your business needs.</p>
    <div class="cta-btns"><a href="/contact" class="btn btn-gold">Request a Free Consultation</a><a href="tel:+923032708008" class="btn btn-outline-white">Call +92-303-2708008</a></div>
  </div>
</section>`;

export const trainingHtml = `<div class="page-hero">
  <div class="page-hero-bg-pattern"></div><div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <nav class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">›</span><span>Training</span></nav>
    <div class="section-tag">Training &amp; Development</div>
    <h1>Empowering <em>Future Traders</em></h1>
    <p class="page-hero-desc">Bridging the gap between academia and industry through practical, hands-on training programs designed for students, entrepreneurs, and business professionals entering the world of international trade.</p>
  </div>
</div>

<section class="section fade-in" style="background:#fff;">
  <div class="training-grid">
    <div class="training-text">
      <div class="section-tag">Our Programs</div>
      <h2 class="section-title">From <em>Knowledge</em> to Action</h2>
      <p>Impex-Pro bridges the gap between academia and industry through practical, hands-on training programs designed for students, entrepreneurs, and business professionals entering the world of international trade.</p>
      <p>Our programs are crafted to instill real-world knowledge, entrepreneurial skills, and a global mindset — enabling participants to start, grow, and expand with confidence.</p>
      <p>We collaborate with universities, training institutes, and government bodies including PIM, SMEDA, TDAP, and leading chambers of commerce to deliver impactful, industry-aligned training.</p>
      <a href="/contact" class="btn btn-gold" style="margin-top:8px;">Enroll Now</a>
    </div>
    <div>
      <div class="section-tag">Programs Offered</div>
      <div class="prog-list">
        <div class="prog-item"><div class="prog-icon">📜</div>Practical Training &amp; Certifications in Import-Export</div>
        <div class="prog-item"><div class="prog-icon">🎤</div>Workshops &amp; Seminars on Global Trade Regulations</div>
        <div class="prog-item"><div class="prog-icon">💼</div>Internship Opportunities with Industry Partners</div>
        <div class="prog-item"><div class="prog-icon">🔬</div>Research &amp; Industry Collaboration Programs</div>
        <div class="prog-item"><div class="prog-icon">👨‍💼</div>Expert Sessions with Industry Leaders</div>
        <div class="prog-item"><div class="prog-icon">🚀</div>Startup Development &amp; Incubation Support</div>
        <div class="prog-item"><div class="prog-icon">🎓</div>University &amp; Institute Collaborations (PIM, SMEDA)</div>
      </div>
    </div>
  </div>
</section>

<section class="section section-dark fade-in">
  <div class="dark-grid-bg"></div>
  <div style="position:relative;z-index:2;">
    <div class="section-tag" style="color:var(--gold)">Curriculum Highlights</div>
    <h2 class="section-title light">What You Will <em>Learn</em></h2>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon">📋</div><h3>Import-Export Procedures</h3><p>Complete understanding of import and export procedures, documentation, HS codes, and regulatory requirements in Pakistan and globally.</p></div>
      <div class="why-card"><div class="why-icon">🛃</div><h3>Customs &amp; GD Filing</h3><p>Hands-on training on GD filing, WEBOC, PSW, customs duties, tariffs, and end-to-end clearance procedures.</p></div>
      <div class="why-card"><div class="why-icon">📊</div><h3>Business Compliance</h3><p>Company registration, NTN, Sales Tax, FBR portals, and compliance frameworks for traders, startups, and SMEs.</p></div>
      <div class="why-card"><div class="why-icon">🌏</div><h3>Global Market Entry</h3><p>Market research, international buyer/supplier identification, pricing strategies, and export readiness assessments.</p></div>
      <div class="why-card"><div class="why-icon">💰</div><h3>Trade Finance</h3><p>Letters of credit, bank guarantees, export refinancing, and international payment methods for traders.</p></div>
      <div class="why-card"><div class="why-icon">🏆</div><h3>Entrepreneurship</h3><p>Business plan development, feasibility studies, startup incubation, and launch support for emerging trade entrepreneurs.</p></div>
    </div>
  </div>
</section>

<section class="section fade-in" style="background:var(--off-white);">
  <div class="section-tag">Who Should Attend</div>
  <h2 class="section-title">Programs for <em>Everyone</em></h2>
  <p style="font-size:16px;color:var(--text-mid);margin-top:16px;max-width:600px;line-height:1.75;">Whether you are a student, a professional, or an established business — our training programs are designed to add value at every level.</p>
  <div class="industries-grid" style="margin-top:44px;">
    <div class="industry-item"><div class="industry-ic">🎓</div><span>University Students</span></div>
    <div class="industry-item"><div class="industry-ic">🚀</div><span>Startups</span></div>
    <div class="industry-item"><div class="industry-ic">👔</div><span>Business Owners</span></div>
    <div class="industry-item"><div class="industry-ic">📦</div><span>Exporters</span></div>
    <div class="industry-item"><div class="industry-ic">🛒</div><span>Importers</span></div>
    <div class="industry-item"><div class="industry-ic">👩‍💼</div><span>Professionals</span></div>
    <div class="industry-item"><div class="industry-ic">🏭</div><span>Manufacturers</span></div>
    <div class="industry-item"><div class="industry-ic">🤝</div><span>Trade Agents</span></div>
  </div>
</section>

<section class="section cta-section fade-in">
  <div class="cta-inner">
    <h2>Ready to <em>Start Your Journey?</em></h2>
    <p>Enroll in our next training program and gain the practical skills, certifications, and mentorship to thrive in global trade.</p>
    <div class="cta-btns"><a href="/contact" class="btn btn-gold">Enroll Now</a><a href="tel:+923032708008" class="btn btn-outline-white">Call for Details</a></div>
  </div>
</section>`;

export const teamHtml = `<!-- ═══ NAVBAR ═══ -->
<!-- ═══ HERO ═══ -->
<section class="team-hero">
  <div class="team-hero-grid-bg"></div>
  <div class="team-hero-orb team-hero-orb-1"></div>
  <div class="team-hero-orb team-hero-orb-2"></div>
  <div class="team-hero-content">
    <nav class="breadcrumb" style="margin-bottom:28px;">
      <a href="/">Home</a>
      <span class="breadcrumb-sep">›</span>
      <span>Our Team</span>
    </nav>
    <div class="team-hero-eyebrow">Leadership &amp; Experts</div>
    <h1>The People Behind<br><em>Impex-Pro</em></h1>
    <p class="team-hero-desc">A distinguished team of trade consultants, logistics specialists, legal experts, and business strategists — united by one goal: your global success.</p>
    <div class="team-hero-stats">
      <div class="team-hero-stat"><div class="n">7+</div><div class="l">Team Members</div></div>
      <div class="team-hero-stat"><div class="n">15+</div><div class="l">Years Experience</div></div>
      <div class="team-hero-stat"><div class="n">400+</div><div class="l">Clients Served</div></div>
    </div>
  </div>
</section>

<!-- ═══ TEAM SECTION ═══ -->
<section class="team-section">

  <!-- Intro -->
  <div class="team-intro fade-in">
    <div class="eyebrow">Our Leadership</div>
    <h2>Experts Driving <em>Global Trade</em></h2>
    <p>From customs and compliance to freight and finance — our leadership brings deep domain expertise and a shared passion for helping businesses reach their full global potential.</p>
  </div>

  <!-- ── FEATURED CEO ── -->
  <div class="team-ceo-wrap fade-in">
    <div class="team-ceo-card">
      <!-- Photo side -->
      <div class="ceo-photo-side">
        <div class="ceo-photo-bg"></div>
        <div class="ceo-photo-pattern"></div>
        <!-- Initials since no photo provided for CEO -->
        <div style="position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;">
          <div style="width:110px;height:110px;border-radius:50%;border:3px solid rgba(212,164,55,0.5);background:rgba(212,164,55,0.08);display:flex;align-items:center;justify-content:center;">
            <span style="font-family:var(--font-cormorant),'Cormorant Garamond',serif;font-size:46px;font-weight:700;color:var(--gold);">FA</span>
          </div>
          <div style="text-align:center;padding:0 24px;">
            <div style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:1.5px;text-transform:uppercase;">Founder</div>
          </div>
        </div>
        <div class="ceo-photo-badge">CEO &amp; Founder</div>
      </div>
      <!-- Info side -->
      <div class="ceo-info-side">
        <div class="ceo-label">Leadership</div>
        <div class="ceo-name">Muhammad Faheem Akhtar</div>
        <div class="ceo-title">Founder &amp; Chief Executive Officer</div>
        <div class="ceo-divider"></div>
        <p class="ceo-bio">With over 15 years of hands-on experience in international trade, Muhammad Faheem Akhtar founded Impex-Pro to be Pakistan's premier one-window trade consultancy. His vision — bridging the gap between ambition and execution — has empowered 400+ individuals and launched 10+ businesses in global trade.</p>
        <div class="ceo-tags">
          <span class="ceo-tag">Import–Export Strategy</span>
          <span class="ceo-tag">Business Development</span>
          <span class="ceo-tag">Customs Compliance</span>
          <span class="ceo-tag">Trade Consultancy</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ── TOP ROW: 4 members with photos ── -->
  <div class="team-grid-main fade-in">

    <!-- Haris Saleem — COO -->
    <div class="tcard">
      <div class="tcard-photo">
        <div class="tcard-photo-bg bg-haris"></div>
        <div class="tcard-photo-pattern"></div>
        <div class="tcard-photo-lines"></div>
        <div class="tcard-photo-arc"></div>
        <div class="tcard-photo-arc2"></div>
        <img loading="lazy" class="tcard-img" src="/images/Haris_Saleem.webp" alt="Muhammad Haris Saleem" loading="lazy">
        <div class="tcard-photo-fade"></div>
        <div class="tcard-num">01</div>
      </div>
      <div class="tcard-info">
        <div class="tcard-name">Muhammad Haris Saleem</div>
        <div class="tcard-role">Chief Operating Officer</div>
        <div class="tcard-divider"></div>
        <div class="tcard-expertise">
          <span class="tcard-tag">Operations</span>
          <span class="tcard-tag">Logistics</span>
          <span class="tcard-tag">Trade Management</span>
        </div>
      </div>
    </div>

    <!-- Sahrish Sana Khalid — Director USA -->
    <div class="tcard">
      <div class="tcard-photo">
        <div class="tcard-photo-bg bg-sehrish"></div>
        <div class="tcard-photo-pattern"></div>
        <div class="tcard-photo-lines"></div>
        <div class="tcard-photo-arc"></div>
        <div class="tcard-photo-arc2"></div>
        <img loading="lazy" class="tcard-img" src="/images/sehrish_sana_khalid.webp" alt="Sahrish Sana Khalid" loading="lazy" style="object-position:center top;">
        <div class="tcard-photo-fade"></div>
        <div class="tcard-num">02</div>
      </div>
      <div class="tcard-info">
        <div class="tcard-name">Sahrish Sana Khalid</div>
        <div class="tcard-role">Director (USA)</div>
        <div class="tcard-divider"></div>
        <div class="tcard-expertise">
          <span class="tcard-tag">US Markets</span>
          <span class="tcard-tag">Business Dev</span>
          <span class="tcard-tag">Global Trade</span>
        </div>
      </div>
    </div>

    <!-- Bilal Hafeez — Head Minerals -->
    <div class="tcard">
      <div class="tcard-photo">
        <div class="tcard-photo-bg bg-bilal"></div>
        <div class="tcard-photo-pattern"></div>
        <div class="tcard-photo-lines"></div>
        <div class="tcard-photo-arc"></div>
        <div class="tcard-photo-arc2"></div>
        <img loading="lazy" class="tcard-img" src="/images/Bilal_hafeez.webp" alt="Bilal Hafeez" loading="lazy">
        <div class="tcard-photo-fade"></div>
        <div class="tcard-num">03</div>
      </div>
      <div class="tcard-info">
        <div class="tcard-name">Bilal Hafeez</div>
        <div class="tcard-role">Head — Minerals &amp; Salt</div>
        <div class="tcard-divider"></div>
        <div class="tcard-expertise">
          <span class="tcard-tag">Minerals</span>
          <span class="tcard-tag">Salt Division</span>
          <span class="tcard-tag">Commodity Trade</span>
        </div>
      </div>
    </div>

    <!-- Malik Qasim — MD -->
    <div class="tcard">
      <div class="tcard-photo">
        <div class="tcard-photo-bg bg-qasim"></div>
        <div class="tcard-photo-pattern"></div>
        <div class="tcard-photo-lines"></div>
        <div class="tcard-photo-arc"></div>
        <div class="tcard-photo-arc2"></div>
        <img loading="lazy" class="tcard-img" src="/images/malik_qasim.webp" alt="Muhammad Qasim" loading="lazy">
        <div class="tcard-photo-fade"></div>
        <div class="tcard-num">04</div>
      </div>
      <div class="tcard-info">
        <div class="tcard-name">Muhammad Qasim</div>
        <div class="tcard-role">Managing Director</div>
        <div class="tcard-divider"></div>
        <div class="tcard-expertise">
          <span class="tcard-tag">Strategy</span>
          <span class="tcard-tag">Business Growth</span>
          <span class="tcard-tag">Management</span>
        </div>
      </div>
    </div>

  </div>

  <!-- ── BOTTOM ROW: 3 members ── -->
  <div class="team-grid-bottom fade-in">

    <!-- Sajid Mehmood — MD -->
    <div class="tcard">
      <div class="tcard-photo">
        <div class="tcard-photo-bg bg-sajid"></div>
        <div class="tcard-photo-pattern"></div>
        <div class="tcard-photo-lines"></div>
        <div class="tcard-photo-arc"></div>
        <div class="tcard-photo-arc2"></div>
        <img loading="lazy" class="tcard-img" src="/images/Sajid_mehmoo.webp" alt="Sajid Mehmood" loading="lazy">
        <div class="tcard-photo-fade"></div>
        <div class="tcard-num">05</div>
      </div>
      <div class="tcard-info">
        <div class="tcard-name">Sajid Mehmood</div>
        <div class="tcard-role">Managing Director</div>
        <div class="tcard-divider"></div>
        <div class="tcard-expertise">
          <span class="tcard-tag">Trade Finance</span>
          <span class="tcard-tag">Operations</span>
          <span class="tcard-tag">Compliance</span>
        </div>
      </div>
    </div>

    <!-- Ch. Amjad Mehmood — MD (no photo, stylized) -->
    <div class="tcard">
      <div class="tcard-photo">
        <div class="tcard-photo-bg bg-amjad"></div>
        <div class="tcard-photo-pattern"></div>
        <div class="tcard-photo-lines"></div>
        <div class="tcard-photo-arc"></div>
        <div class="tcard-photo-arc2"></div>
        <div class="tcard-initials">AM</div>
        <div class="tcard-photo-fade"></div>
        <div class="tcard-num">06</div>
      </div>
      <div class="tcard-info">
        <div class="tcard-name">Ch. Amjad Mehmood</div>
        <div class="tcard-role">Managing Director</div>
        <div class="tcard-divider"></div>
        <div class="tcard-expertise">
          <span class="tcard-tag">Customs</span>
          <span class="tcard-tag">Freight</span>
          <span class="tcard-tag">Clearance</span>
        </div>
      </div>
    </div>

    <!-- Placeholder — You can add next team member -->
    <div class="tcard" style="border: 2px dashed rgba(11,31,58,0.12); box-shadow:none; background: rgba(11,31,58,0.02);">
      <div class="tcard-photo" style="background: rgba(11,31,58,0.04);">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
          <div style="width:60px;height:60px;border-radius:50%;border:2px dashed rgba(212,164,55,0.35);display:flex;align-items:center;justify-content:center;">
            <span style="font-size:26px;color:rgba(212,164,55,0.5);">+</span>
          </div>
          <span style="font-size:12px;color:var(--text-light);letter-spacing:1px;text-transform:uppercase;">Your Team</span>
        </div>
      </div>
      <div class="tcard-info" style="text-align:center;">
        <div class="tcard-name" style="color:var(--text-light);font-size:16px;">Growing Team</div>
        <div class="tcard-role" style="color:rgba(212,164,55,0.5);">Add New Member</div>
        <div class="tcard-divider" style="margin:12px auto;"></div>
        <a href="/contact" style="font-size:12px;color:var(--gold);text-decoration:none;letter-spacing:0.5px;">Join Us →</a>
      </div>
    </div>

  </div>

  <!-- ── JOIN BANNER ── -->
  <div class="team-join-banner fade-in">
    <div class="team-join-bg"></div>
    <div class="join-text">
      <div class="join-tag">Career Opportunities</div>
      <div class="join-title">Want to <em>Join Our Team?</em></div>
      <p class="join-desc">We are always looking for passionate trade professionals, logistics specialists, and business consultants to join our growing team. Bring your expertise — we'll build something great together.</p>
    </div>
    <div class="join-actions">
      <a href="/contact" class="btn-join-primary">Get in Touch</a>
      <a href="mailto:impex.pro.consultant@gmail.com" class="btn-join-secondary">Send Your CV</a>
    </div>
  </div>

</section>

<!-- ═══ FOOTER ═══ -->
<!-- WhatsApp FAB -->`;

export const activitiesHtml = `<div class="page-hero">
  <div class="page-hero-bg-pattern"></div><div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <nav class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">›</span><span>Activities</span></nav>
    <div class="section-tag">Our Presence</div>
    <h1>Corporate Activities &amp; <em>Official Engagements</em></h1>
    <p class="page-hero-desc">Showcasing our professional meetings, training sessions, conferences, workshops, and strategic collaborations that drive business growth and international trade development.</p>
  </div>
</div>

<section class="section fade-in" style="background:#fff;">
  <div class="section-tag">Gallery</div>
  <h2 class="section-title">Events &amp; <em>Engagements</em></h2>
  <p style="font-size:16px;color:var(--text-mid);margin-top:16px;max-width:640px;line-height:1.75;">A visual record of our active presence across conferences, workshops, government meetings, and industry collaborations. Replace the placeholder images below with your real event photos.</p>

  <div class="masonry">
    <div class="masonry-item">
      <div class="masonry-thumb" style="height:200px;">🏛️</div>
      <div class="masonry-body">
        <div class="masonry-meta"><span class="masonry-tag">Conference</span><span class="masonry-date">March 2025</span></div>
        <h3>Regional Transport Ministers' Conference 2025</h3>
        <p>Impex-Pro leadership participated in high-level discussions on regional trade connectivity, logistics infrastructure, and international transportation collaboration.</p>
        <div class="masonry-loc">📍 Islamabad, Pakistan</div>
      </div>
    </div>
    <div class="masonry-item">
      <div class="masonry-thumb" style="height:160px;">📚</div>
      <div class="masonry-body">
        <div class="masonry-meta"><span class="masonry-tag">Training</span><span class="masonry-date">Jan 2025</span></div>
        <h3>Export Development Training Session</h3>
        <p>Capacity-building workshop focused on empowering entrepreneurs and startups with practical knowledge of export procedures and international trade operations.</p>
        <div class="masonry-loc">📍 PIM, Islamabad</div>
      </div>
    </div>
    <div class="masonry-item">
      <div class="masonry-thumb" style="height:140px;">🤝</div>
      <div class="masonry-body">
        <div class="masonry-meta"><span class="masonry-tag">Networking</span><span class="masonry-date">Feb 2025</span></div>
        <h3>Business Networking &amp; Industry Collaboration</h3>
        <p>Strategic meetings with business leaders and institutional representatives to strengthen partnerships and promote sustainable trade opportunities.</p>
        <div class="masonry-loc">📍 Lahore Chamber of Commerce</div>
      </div>
    </div>
    <div class="masonry-item">
      <div class="masonry-thumb" style="height:160px;">🎓</div>
      <div class="masonry-body">
        <div class="masonry-meta"><span class="masonry-tag">Workshop</span><span class="masonry-date">Nov 2024</span></div>
        <h3>Professional Training &amp; Skill Development</h3>
        <p>Interactive sessions conducted to bridge the gap between academia and industry through practical business and logistics training.</p>
        <div class="masonry-loc">📍 NUST University, Islamabad</div>
      </div>
    </div>
    <div class="masonry-item">
      <div class="masonry-thumb" style="height:200px;">✈️</div>
      <div class="masonry-body">
        <div class="masonry-meta"><span class="masonry-tag">Delegation</span><span class="masonry-date">Dec 2024</span></div>
        <h3>Official Business Delegation Visit</h3>
        <p>Corporate engagement aimed at exploring investment opportunities, trade facilitation, and international business collaboration with regional partners.</p>
        <div class="masonry-loc">📍 Ministry of Commerce, Islamabad</div>
      </div>
    </div>
    <div class="masonry-item">
      <div class="masonry-thumb" style="height:140px;">💡</div>
      <div class="masonry-body">
        <div class="masonry-meta"><span class="masonry-tag">Entrepreneurship</span><span class="masonry-date">Oct 2024</span></div>
        <h3>Entrepreneurship Development Workshop</h3>
        <p>Training initiatives designed to support emerging entrepreneurs in startup development, business formalization, and export readiness.</p>
        <div class="masonry-loc">📍 SMEDA, Islamabad</div>
      </div>
    </div>
  </div>
</section>

<!-- VIDEO HIGHLIGHTS -->
<section class="section fade-in" style="background:var(--off-white);">
  <div class="section-tag">Video Highlights</div>
  <h2 class="section-title">Event Highlights &amp; <em>Session Moments</em></h2>
  <p style="font-size:15px;color:var(--text-mid);line-height:1.75;margin-top:16px;max-width:640px;">Explore key moments from our conferences, workshops, official meetings, and training programs that reflect our commitment to professional growth and international business development.</p>
  <div class="vid-grid">
    <div class="vid-card">
      <div class="vid-thumb" style="font-size:48px;">📋<div class="vid-play">▶</div></div>
      <div class="vid-info"><div class="vid-tag">Workshop</div><h4>Export Documentation Training Session</h4><span>Jan 2025 · Islamabad</span></div>
    </div>
    <div class="vid-card">
      <div class="vid-thumb" style="font-size:48px;background:linear-gradient(135deg,#122d52,#0B1F3A);">🎤<div class="vid-play">▶</div></div>
      <div class="vid-info"><div class="vid-tag">Conference</div><h4>CEO Keynote — Regional Trade Conference 2025</h4><span>March 2025 · Islamabad</span></div>
    </div>
    <div class="vid-card">
      <div class="vid-thumb" style="font-size:48px;background:linear-gradient(135deg,#163E72,#0d2540);">🚀<div class="vid-play">▶</div></div>
      <div class="vid-info"><div class="vid-tag">Entrepreneurship</div><h4>Startup &amp; Export Readiness Bootcamp</h4><span>Oct 2024 · SMEDA, Islamabad</span></div>
    </div>
  </div>
  <p style="text-align:center;margin-top:32px;font-size:13px;color:var(--text-light);">📹 Upload real event photos &amp; videos by replacing the emoji placeholders with your <code>&lt;img&gt;</code> or <code>&lt;iframe&gt;</code> tags. Contact: <strong>impex.pro.consultant@gmail.com</strong></p>
</section>

<section class="section cta-section fade-in">
  <div class="cta-inner">
    <h2>Partner With Us in <em>Your Next</em> Event</h2>
    <p>Invite Impex-Pro to speak, train, or collaborate at your next business event, university workshop, or trade conference.</p>
    <div class="cta-btns"><a href="/contact" class="btn btn-gold">Get in Touch</a><a href="tel:+923032708008" class="btn btn-outline-white">Call Us Now</a></div>
  </div>
</section>`;

export const contactBeforeHtml = `<div class="page-hero">
  <div class="page-hero-bg-pattern"></div><div class="page-hero-glow"></div>
  <div class="page-hero-content">
    <nav class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">›</span><span>Contact</span></nav>
    <div class="section-tag">Get in Touch</div>
    <h1>Let's Start Your <em>Journey</em></h1>
    <p class="page-hero-desc">Whether you're a new startup, an established business, or an individual looking to enter international trade — we are here to guide you every step of the way.</p>
  </div>
</div>

<section class="section fade-in" style="background:var(--off-white);">
  <div class="contact-grid">
    <!-- Info -->
    <div class="contact-info">
      <div class="section-tag">Contact Information</div>
      <h2 class="section-title">Reach Us <em>Anytime</em></h2>
      <p>Our team is available to assist you with any query, service enquiry, or consultation request. Reach out through any of the channels below.</p>
      <div class="contact-items">
        <div class="contact-item">
          <div class="contact-icon">📍</div>
          <div><div class="contact-label">Office Address</div><div class="contact-val">Office No. 04, 2nd Floor, Laraib Plaza, G-9 Markaz, Islamabad, Pakistan — 44000</div></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">📧</div>
          <div><div class="contact-label">Email</div><div class="contact-val"><a href="mailto:impex.pro.consultant@gmail.com">impex.pro.consultant@gmail.com</a></div></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">📱</div>
          <div><div class="contact-label">Phone / WhatsApp</div><div class="contact-val"><a href="tel:+923032708008">+92-303-2708008</a></div></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">🌐</div>
          <div><div class="contact-label">Website</div><div class="contact-val"><a href="https://www.impexalliancegroup.com" target="_blank">impexalliancegroup.com</a></div></div>
        </div>
      </div>
    </div>
    <!-- Form -->`;

export const contactAfterHtml = `</section>

<!-- MAP -->
<iframe class="map-embed" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.03!2d73.0479!3d33.7038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG-9+Markaz%2C+Islamabad!5e0!3m2!1sen!2spk!4v1700000000000" allowfullscreen loading="lazy" title="Impex-Pro Office — G-9 Markaz, Islamabad"></iframe>`;
