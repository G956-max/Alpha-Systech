import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailjsConfig, validateEmailJSConfig } from '../lib/emailjs.config';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  'Translation & Localization',
  'Audio Transcription',
  'Subtitling & Captioning',
  'AI Data Solutions',
  'Enterprise Solutions',
  'Other'
];

const budgets = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Not sure / Discuss'
];

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const name = formData.get('user_name') as string;
    const email = formData.get('user_email') as string;
    const message = formData.get('message') as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = 'Full name is required (min 2 characters)';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Valid email address is required';
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

  const handleClose = () => {
    setStatus('idle');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-alpha-border px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-xl font-sans font-semibold text-navy">Get Started</h3>
                <p className="text-sm text-navy/50">Fill out the form below and we'll be in touch shortly</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-alpha-grey rounded-full transition-colors"
                type="button"
              >
                <X className="w-5 h-5 text-navy/60" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-navy mb-2">Your requirement has been submitted successfully. Our team will contact you soon.</h4>
                  <p className="text-navy/60">Our team will contact you soon.</p>
                  <button
                    onClick={handleClose}
                    className="btn-primary mt-6"
                    type="button"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                      Full Name <span className="text-orange-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                        Email Address <span className="text-orange-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="user_email"
                        className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all"
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="user_phone"
                        className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-navy mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="user_company"
                      className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-navy mb-1.5">
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="user_service"
                        className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all bg-white"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-navy mb-1.5">
                        Project Budget
                      </label>
                      <select
                        id="budget"
                        name="user_budget"
                        className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all bg-white"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                      Message <span className="text-orange-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2.5 border border-alpha-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-accent/20 focus:border-orange-accent transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary !py-4 !text-base disabled:opacity-60 disabled:cursor-not-allowed"
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
