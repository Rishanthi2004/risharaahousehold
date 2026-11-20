import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CreditCard, CheckCircle2, Send } from 'lucide-react';
import { useShortlist } from '../context/ShortlistContext';
import { ScrollReveal, SCROLL_VIEWPORT } from '../components/ScrollReveal';

export const ContactPage: React.FC = () => {
  const { inquiryDraft, setInquiryDraft } = useShortlist();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (inquiryDraft) {
      setMessage(inquiryDraft);
      setInquiryDraft('');
    }
  }, [inquiryDraft, setInquiryDraft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setFormError('Please fill in your name, email, phone number, and message before submitting.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
    setFormError('');
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-[#EFE6D8]">
        <div className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#D4921D] mb-1 sm:mb-2">
              Contact Us
            </p>
            <h1 className="font-serif text-2xl sm:text-5xl font-semibold text-[#231B15] leading-tight mb-2 sm:mb-4">
              Connect with RISHARAA Showroom
            </h1>
            <p className="text-xs sm:text-base text-[#5A4E44] leading-relaxed">
              Have a question about our kitchen appliances, furniture, mattresses, cooling
              electronics, or travel luggage? Send us a message below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="max-w-[1320px] mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SCROLL_VIEWPORT}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-xl sm:rounded-2xl border border-[#EFE7DA] p-4 sm:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 sm:py-10 text-center space-y-3 sm:space-y-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F6EDE3] text-[#B87B14] inline-flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h2 className="font-serif text-xl sm:text-3xl font-semibold text-[#231B15]">
                  Inquiry Received (Demo Confirmation)
                </h2>
                <p className="text-xs sm:text-base text-[#5A4E44] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#231B15]">{name}</strong>. Your showroom
                  message has been recorded in this demo preview.
                </p>
                <div className="pt-2 sm:pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 sm:py-3 rounded-full bg-[#241D18] text-white text-xs sm:text-sm font-medium hover:bg-[#3A2F27] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#231B15] mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-[#7C6F63]">
                    Share your product interest or showroom inquiry below.
                  </p>
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs sm:text-sm text-[#991B1B]"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#231B15] mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] placeholder:text-[#8E8174] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#231B15] mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] placeholder:text-[#8E8174] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#231B15] mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] placeholder:text-[#8E8174] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#231B15] mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us which products, categories, or EMI details you would like to know more about..."
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#FFFBF5] border border-[#E7DCCB] text-xs sm:text-sm text-[#231B15] placeholder:text-[#8E8174] focus:outline-none focus:border-[#E8A829] focus:ring-2 focus:ring-[#E8A829]/20 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#F2BA49] text-[#231B15] font-semibold text-xs sm:text-sm hover:bg-[#E5A72B] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#231B15]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Business Contact Placeholders + Google Maps Placeholder */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Contact Info Placeholders */}
            <ScrollReveal className="bg-white rounded-xl sm:rounded-2xl border border-[#EFE7DA] p-4 sm:p-8 space-y-3.5 sm:space-y-5" delay={0.05}>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#231B15] mb-1">
                  Showroom Contact Placeholders
                </h2>
                <p className="text-[11px] sm:text-xs text-[#7C6F63]">
                  Replace these placeholders with your official RISHARAA showroom contact details.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-1">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#B87B14] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#231B15]">Showroom Address</div>
                    <p className="text-xs sm:text-sm text-[#5A4E44] mt-0.5">
                      [Building / Street Address Placeholder], [City, State — PIN Placeholder]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#B87B14] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#231B15]">Phone Number</div>
                    <p className="text-xs sm:text-sm text-[#5A4E44] mt-0.5">
                      [+91 XXXXX XXXXX — Showroom Phone Placeholder]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#B87B14] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#231B15]">Email Address</div>
                    <p className="text-xs sm:text-sm text-[#5A4E44] mt-0.5">
                      [contact@risharaa-placeholder.example]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#B87B14] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#231B15]">Showroom Timings</div>
                    <p className="text-xs sm:text-sm text-[#5A4E44] mt-0.5">
                      [Opening Hours Placeholder — Monday to Sunday]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2.5 border-t border-[#F4EDE3]">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#B87B14] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#231B15]">
                      EMI Helpdesk (Demo Feature)
                    </div>
                    <p className="text-xs sm:text-sm text-[#5A4E44] mt-0.5">
                      Bajaj Finserv EMI payment assistance available in showroom.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Google Maps Placeholder */}
            <ScrollReveal className="rounded-xl sm:rounded-2xl border border-[#EADCD0] bg-[#F6EDE3] overflow-hidden" delay={0.08}>
              <div className="relative h-44 sm:h-64 flex flex-col items-center justify-center p-5 sm:p-6 text-center">
                <svg
                  className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="map-placeholder-grid"
                      width="36"
                      height="36"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 36 0 L 0 0 0 36"
                        fill="none"
                        stroke="#CEBEAA"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-placeholder-grid)" />
                  <path
                    d="M0 170 Q 140 120 260 155 T 520 110"
                    fill="none"
                    stroke="#E8A829"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#241D18] text-[#F4B844] flex items-center justify-center shadow-md mb-2 sm:mb-3">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#231B15] mb-1">
                    Google Maps Placeholder
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#5A4E44] max-w-xs leading-relaxed">
                    Embed your official RISHARAA showroom Google Maps pin here once configured.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};
