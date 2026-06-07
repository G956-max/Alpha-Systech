import { useState, useRef, FormEvent } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { emailjsConfig, validateEmailJSConfig } from '../lib/emailjs.config';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const company = formData.get('user_company') as string;
    const phone = formData.get('user_phone') as string;
    const service = formData.get('user_service') as string;
    const budget = formData.get('user_budget') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Full name is required (min 2 characters)';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email address is required';
    }

    if (!company || company.trim().length < 2) {
      newErrors.company = 'Company name is required';
    }

    if (!phone || phone.trim().length < 10) {
      newErrors.phone = 'Phone number is required (min 10 characters)';
    }

    if (!service) {
      newErrors.service = 'Service selection is required';
    }

    if (!budget) {
      newErrors.budget = 'Budget selection is required';
    }

    if (!message || message.trim().length < 10) {
      newErrors.message = 'Message is required (min 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    const formData = new FormData(formRef.current!);
    if (!validateForm(formData)) return;

    setIsLoading(true);

    try {
      // Validate EmailJS configuration
      const config = validateEmailJSConfig();
      console.log('EmailJS Configuration:', config);

      // Send email using EmailJS
      const result = await emailjs.sendForm(
        config.serviceId,
        config.templateId,
        formRef.current!,
        config.publicKey
      );

      console.log('EmailJS Response:', result);

      if (result.status === 200) {
        setStatus('success');
        formRef.current?.reset();
      } else {
        console.error('EmailJS failed with status:', result.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-navy leading-tight mb-8">
            Let's <span className="text-orange-accent underline decoration-orange-accent/20">Build</span> Together
          </h1>
          <p className="text-xl text-navy/60 font-medium leading-relaxed">
            Ready to elevate your AI with high-quality language intelligence? Get in touch with our team of experts today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Info */}
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-display font-black text-navy mb-12">Contact Information</h2>
            <div className="space-y-7">
              {/* Phone */}
              <div className="flex gap-4 items-center p-4 rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_38px_rgba(15,23,42,0.14)]">
                <div className="relative w-14 h-14 rounded-[14px] bg-[#F9FAFB] shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#111827]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5a2.25 2.25 0 012.25-2.25h3.375a1.125 1.125 0 011.05.788l.75 2.625a1.125 1.125 0 01-.38 1.24l-1.44 1.44a13.5 13.5 0 006.075 6.075l1.44-1.44a1.125 1.125 0 011.24-.38l2.625.75a1.125 1.125 0 01.788 1.05V17.25A2.25 2.25 0 0118.75 19.5h-1.5c-8.287 0-15-6.713-15-15V4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 5.5l1.5 1.5" className="stroke-[#E6C200]" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.22em] mb-1">Phone</p>
                  <p className="text-lg font-semibold text-[#111827]">+91 12345 67890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-center p-4 rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_38px_rgba(15,23,42,0.14)]">
                <div className="relative w-14 h-14 rounded-[14px] bg-[#F9FAFB] shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#111827]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25l8.25 5.25L19.5 8.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z" />
                    <path d="M7.5 6.75l4.5 3 4.5-3" className="stroke-[#E6C200]" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.22em] mb-1">Email</p>
                  <p className="text-lg font-semibold text-[#111827]">info@alphasolutions.in</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-center p-4 rounded-[28px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_38px_rgba(15,23,42,0.14)]">
                <div className="relative w-14 h-14 rounded-[14px] bg-[#F9FAFB] shadow-[0_8px_20px_rgba(15,23,42,0.08)] flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#111827]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-4.5 6-10.5S13.5 3 12 3 6 5.5 6 10.5 12 21 12 21z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a3 3 0 100-6 3 3 0 000 6z" className="stroke-[#E6C200]" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.22em] mb-1">Location</p>
                  <p className="text-lg font-semibold text-[#111827]">Chennai, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="premium-card p-10 md:p-16 border-t-8 border-t-orange-accent"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold text-navy mb-3">Your requirement has been submitted successfully. Our team will contact you soon.</h4>
                <p className="text-navy/60 text-lg">Our team will contact you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-primary mt-8"
                  type="button"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                  >
                    Something went wrong. Please try again.
                  </motion.div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Full Name</label>
                    <input
                      type="text"
                      name="user_name"
                      className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Email Address</label>
                    <input
                      type="email"
                      name="user_email"
                      className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors"
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Company</label>
                    <input
                      type="text"
                      name="user_company"
                      className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors"
                      placeholder="TechCorp AI"
                    />
                    {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Phone Number</label>
                    <input
                      type="tel"
                      name="user_phone"
                      className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors"
                      placeholder="+91 12345 67890"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Service Required</label>
                    <select
                      name="user_service"
                      className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="Translation & Localization">Translation & Localization</option>
                      <option value="Audio Transcription">Audio Transcription</option>
                      <option value="Subtitling & Captioning">Subtitling & Captioning</option>
                      <option value="AI Data Solutions">AI Data Solutions</option>
                      <option value="Enterprise Solutions">Enterprise Solutions</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Budget</label>
                    <select
                      name="user_budget"
                      className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                      <option value="Not sure / Discuss">Not sure / Discuss</option>
                    </select>
                    {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-navy/30 uppercase tracking-[0.2em]">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-alpha-grey border border-alpha-border px-6 py-4 rounded-xl focus:outline-none focus:border-orange-accent font-bold text-navy transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full !py-5 text-base font-black disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
