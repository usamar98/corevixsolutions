"use client";

import { useState } from "react";
import { CheckCircle, PaperPlaneTilt, WarningCircle } from "@phosphor-icons/react";

const serviceOptions = [
  "Website development",
  "Website fixing",
  "AI automation",
  "AI system",
  "Smart dashboard",
  "SaaS product",
  "General enquiry",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: serviceOptions[0],
  message: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFeedback("");
    setStatus("idle");
  }

  async function submitContact(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setFeedback("Add your name, email, and message before sending.");
      return;
    }

    setStatus("submitting");
    setFeedback("Sending your message to Corevix.");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "The message could not be sent right now.");
      }

      setStatus("success");
      setFeedback("Message received. Corevix will review it and reply from the team inbox.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setFeedback(error.message || "The message could not be sent right now.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submitContact}>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="contact-form__trap"
        name="website"
        onChange={updateField}
        tabIndex={-1}
        value={form.website}
      />

      <div className="contact-form__grid">
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={updateField} placeholder="Your full name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@company.com" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" value={form.phone} onChange={updateField} placeholder="+92 300 0000000" />
        </label>
        <label>
          <span>Company</span>
          <input name="company" value={form.company} onChange={updateField} placeholder="Company name" />
        </label>
      </div>

      <label>
        <span>Service</span>
        <select name="service" value={form.service} onChange={updateField}>
          {serviceOptions.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={updateField}
          placeholder="Tell us what needs to be built, fixed, automated, or measured."
          rows={5}
        />
      </label>

      {feedback ? (
        <p className={`contact-form__status contact-form__status--${status}`} role={status === "error" ? "alert" : "status"}>
          {status === "success" ? (
            <CheckCircle size={18} weight="fill" aria-hidden="true" />
          ) : status === "error" ? (
            <WarningCircle size={18} weight="fill" aria-hidden="true" />
          ) : null}
          {feedback}
        </p>
      ) : null}

      <button className="contact-form__submit" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending message" : "Send message"}
        <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
      </button>
    </form>
  );
}
