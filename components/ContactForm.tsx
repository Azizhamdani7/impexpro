"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const reduceMotion = useReducedMotion();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setState("submitting");
    setMessage("");

    try {
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.get("name"),
          company: formData.get("company"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          trade: formData.get("trade"),
          message: formData.get("message"),
          website: formData.get("website"),
          sourcePage: window.location.pathname
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const firstError = data.errors ? Object.values(data.errors)[0] : data.error;
        throw new Error(typeof firstError === "string" ? firstError : "Form submission failed");
      }

      form.reset();
      setState("success");
      setMessage("Thank you. Your message has been sent successfully.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "We could not send your message right now.");
    }
  }

  return (
    <motion.div
      className="contact-form-wrap"
      initial={reduceMotion ? false : { y: 20, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3>Request a Free Consultation</h3>
      <AnimatePresence initial={false}>
        {message ? (
          <motion.div
            className={`form-msg ${state === "success" ? "success" : "error"}`}
            initial={reduceMotion ? false : { y: -8, opacity: 0 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: -8, opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hp-field"
        />
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fname">Full Name *</label>
            <input type="text" id="fname" name="name" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="fcompany">Company</label>
            <input type="text" id="fcompany" name="company" placeholder="Company name" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="femail">Email *</label>
            <input type="email" id="femail" name="email" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="fphone">Phone</label>
            <input type="tel" id="fphone" name="phone" placeholder="+92 XXX XXXXXXX" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fservice">Service Needed</label>
            <select id="fservice" name="service" defaultValue="">
              <option value="">Select a service</option>
              <option>Customs Clearance</option>
              <option>Freight Forwarding</option>
              <option>Business Registration</option>
              <option>Tax &amp; Legal</option>
              <option>Consultancy</option>
              <option>Training Programs</option>
              <option>Branding &amp; Support</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ftrade">Trade Type</label>
            <select id="ftrade" name="trade" defaultValue="Import / Export">
              <option>Import / Export</option>
              <option>Import Only</option>
              <option>Export Only</option>
              <option>Both</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fmessage">Message *</label>
          <textarea
            id="fmessage"
            name="message"
            placeholder="Describe your business needs, product type, and any specific requirements..."
            required
          />
        </div>
        <motion.button
          type="submit"
          className="form-submit"
          disabled={state === "submitting"}
          whileTap={reduceMotion || state === "submitting" ? undefined : { scale: 0.985 }}
        >
          {state === "submitting" ? "Sending..." : "Send Message →"}
        </motion.button>
      </form>
    </motion.div>
  );
}
