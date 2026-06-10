import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { pageMetadata, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata.contact;

export default function ContactPage() {
  return (
    <>
      <PageHero
        page="Contact"
        title={<>Let&apos;s Start Your <em>Journey</em></>}
        description="Reach out to discuss your import-export needs, business registration, customs clearance, freight forwarding, or training requirements."
      />
      <section className="section fade-in" style={{ background: "var(--off-white)" }}>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-tag">Contact Impex-Pro</div>
            <h2 className="section-title">Reach Us <em>Anytime</em></h2>
            <p>
              Whether you are starting your first import-export business or need expert
              support for customs, logistics, registration, tax, legal, or training,
              our team is ready to help.
            </p>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-val">
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone / WhatsApp</div>
                  <div className="contact-val">
                    <a href={site.phoneHref}>{site.phone}</a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <div>
                  <div className="contact-label">Website</div>
                  <div className="contact-val">
                    <a href={site.url} target="_blank" rel="noreferrer">
                      impexalliancegroup.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Office</div>
                  <div className="contact-val">{site.address}, Pakistan</div>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <iframe
        className="map-embed"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.03!2d73.0479!3d33.7038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG-9+Markaz%2C+Islamabad!5e0!3m2!1sen!2spk!4v1700000000000"
        allowFullScreen
        loading="lazy"
        title="Impex-Pro Office - G-9 Markaz, Islamabad"
      />
    </>
  );
}
