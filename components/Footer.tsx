"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={reduceMotion ? false : { y: 22, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">IP</div>
            <div className="footer-logo-name">{site.name}</div>
          </div>
          <p>
            Providing One Window Solutions for Import-Export businesses, consultancy,
            training, customs clearance, freight forwarding, and more, all under one
            trusted roof.
          </p>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/team">Our Team</Link></li>
            <li><Link href="/activities">Activities</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services">Customs Clearance</Link></li>
            <li><Link href="/services">Freight Forwarding</Link></li>
            <li><Link href="/services">Business Registration</Link></li>
            <li><Link href="/services">Tax &amp; Legal</Link></li>
            <li><Link href="/training">Training</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><Link href="/contact">{site.address}</Link></li>
            <li><a href={site.url} target="_blank" rel="noreferrer">impexalliancegroup.com</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Impex-Pro Business Consultant · Impex Trading Corporation. All rights reserved.</p>
        <p>Built for <Link href="/services">Global Trade Excellence</Link></p>
      </div>
    </motion.footer>
  );
}
