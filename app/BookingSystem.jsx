"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarBlank,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  PaperPlaneTilt,
  UserCircle,
} from "@phosphor-icons/react";

const bookingServices = [
  "Website development",
  "Website fixing",
  "AI automation",
  "AI system planning",
  "Smart dashboard build",
  "SaaS product consultation",
];

const timeSlots = ["09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

function createAvailableDays() {
  const formatter = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const days = [];
  const cursor = new Date();

  while (days.length < 6) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();

    if (day !== 0) {
      const value = cursor.toISOString().slice(0, 10);
      days.push({
        label: formatter.format(cursor),
        value,
      });
    }
  }

  return days;
}

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: bookingServices[0],
  goal: "",
};

export default function BookingSystem() {
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const days = createAvailableDays();
    setAvailableDays(days);
    setSelectedDay(days[0]?.value || "");
  }, []);

  const selectedDayLabel = useMemo(() => {
    return availableDays.find((day) => day.value === selectedDay)?.label || "Selected day";
  }, [availableDays, selectedDay]);

  const mailtoHref = useMemo(() => {
    const activeBooking = booking || {
      ...form,
      day: selectedDayLabel,
      time: selectedTime,
    };
    const subject = encodeURIComponent(`Corevix appointment request: ${activeBooking.service}`);
    const body = encodeURIComponent(
      [
        `Name: ${activeBooking.name}`,
        `Email: ${activeBooking.email}`,
        `Phone: ${activeBooking.phone}`,
        `Company: ${activeBooking.company || "Not provided"}`,
        `Service: ${activeBooking.service}`,
        `Preferred day: ${activeBooking.day}`,
        `Preferred time: ${activeBooking.time}`,
        "",
        `Project goal: ${activeBooking.goal}`,
      ].join("\n"),
    );

    return `mailto:hello@corevixsolutions.com?subject=${subject}&body=${body}`;
  }, [booking, form, selectedDayLabel, selectedTime]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function submitBooking(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.goal.trim()) {
      setError("Add your name, email, phone, and project goal before confirming.");
      return;
    }

    const nextBooking = {
      ...form,
      day: selectedDayLabel,
      time: selectedTime,
      reference: `CVX-${Date.now().toString().slice(-6)}`,
    };

    setBooking(nextBooking);
    setError("");

    try {
      window.localStorage.setItem("corevix-booking-request", JSON.stringify(nextBooking));
    } catch {
      // Local storage can be unavailable in strict browser modes. The confirmation still works.
    }
  }

  function resetBooking() {
    setBooking(null);
    setForm(initialForm);
    setSelectedTime(timeSlots[0]);
    setSelectedDay(availableDays[0]?.value || "");
    setError("");
  }

  return (
    <section className="booking section-shell" id="booking">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Book appointment</p>
          <h2>Choose a time for a Corevix growth appointment.</h2>
        </div>
        <p>
          Pick the service, choose a slot, and share what you want to build or fix.
          The request is prepared for direct email so the next step is simple.
        </p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={submitBooking}>
          <div className="booking-form__grid">
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
              {bookingServices.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </label>

          <div className="booking-picker">
            <span>Preferred day</span>
            <div className="booking-days">
              {availableDays.length > 0 ? (
                availableDays.map((day) => (
                  <button
                    className={selectedDay === day.value ? "is-active" : ""}
                    key={day.value}
                    type="button"
                    onClick={() => setSelectedDay(day.value)}
                  >
                    <CalendarBlank size={17} weight="duotone" aria-hidden="true" />
                    {day.label}
                  </button>
                ))
              ) : (
                <em>Loading available days</em>
              )}
            </div>
          </div>

          <div className="booking-picker">
            <span>Preferred time</span>
            <div className="booking-times">
              {timeSlots.map((slot) => (
                <button
                  className={selectedTime === slot ? "is-active" : ""}
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                >
                  <Clock size={17} weight="duotone" aria-hidden="true" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <label>
            <span>Project goal</span>
            <textarea
              name="goal"
              value={form.goal}
              onChange={updateField}
              placeholder="Tell us what you want Corevix to build, fix, automate, or measure."
              rows={5}
            />
          </label>

          {error ? (
            <p className="booking-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="booking-actions">
            <button className="primary-action" type="submit">
              Confirm appointment
              <CheckCircle size={18} weight="bold" aria-hidden="true" />
            </button>
            <a className="secondary-action" href={mailtoHref}>
              Email request
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </form>

        <aside className="booking-summary" aria-live="polite">
          <div className="booking-summary__head">
            <UserCircle size={28} weight="duotone" aria-hidden="true" />
            <div>
              <span>Appointment desk</span>
              <strong>{booking ? "Request ready" : "Select your slot"}</strong>
            </div>
          </div>

          <div className="booking-ticket">
            <span>Service</span>
            <strong>{booking?.service || form.service}</strong>
          </div>
          <div className="booking-ticket">
            <span>Preferred slot</span>
            <strong>
              {booking ? `${booking.day}, ${booking.time}` : `${selectedDayLabel}, ${selectedTime}`}
            </strong>
          </div>
          <div className="booking-ticket">
            <span>Client</span>
            <strong>{booking?.name || form.name || "Waiting for details"}</strong>
          </div>

          {booking ? (
            <div className="booking-confirmed">
              <CheckCircle size={24} weight="fill" aria-hidden="true" />
              <div>
                <strong>Booking request created</strong>
                <p>
                  Reference {booking.reference}. Send the prepared email so Corevix
                  can confirm the exact appointment.
                </p>
              </div>
              <a className="primary-action" href={mailtoHref}>
                Send booking email
                <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
              </a>
              <button className="booking-reset" type="button" onClick={resetBooking}>
                Create another request
              </button>
            </div>
          ) : (
            <p>
              Appointments are best for website audits, automation planning, dashboard
              scoping, and AI system discovery.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
