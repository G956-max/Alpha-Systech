import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EnquiryModal } from '../components/EnquiryModal';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

const services = [
  {
    title: 'Translation & Localization',
    desc: 'Powering global reach with high-fidelity translations. Our expert linguists combine domain expertise with AI-driven workflows for unmatched scale.',
    points: ['Technical & Legal Precision', '300+ Language Pairs', 'Cultural Nuance Integration'],
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Audio Transcription',
    desc: 'Converting complex multilingual audio into structured, actionable data. Optimized for training speech models and large-scale media processing.',
    points: ['Speaker Diarization', 'Custom JSON Output', 'Verbatim & Clean Read'],
    image: 'https://images.unsplash.com/photo-1589578233442-c3408381e6a4?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Subtitling & Captioning',
    desc: 'Frame-accurate time-syncing for global broadcast and streaming. We ensure your visual content is accessible to every linguistic demographic.',
    points: ['Frame-Perfect Timing', 'Closed Captioning (CC)', 'Multilingual Overlay'],
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Proofreading & Editing',
    desc: 'Rigorous linguistic validation for mission-critical deployments. We polish every word to ensure professional clarity and brand alignment.',
    points: ['Cross-Dialect Consistency', 'Scientific & Med-Tech Review', 'Final Quality Audit'],
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'Voice Data Collection',
    desc: 'Curating diverse, high-quality voice datasets to power next-generation speech recognition and synthesis models.',
    points: ['Accented English & Regional', 'Noise-Robust Sampling', 'Privacy Compliant'],
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'AI Data Solutions',
    desc: 'Structured data curation, annotation, and validation pipelines to fuel high-performance machine learning models.',
    points: ['LLM Fine-Tuning Data', 'RLHF & Alignment', 'Domain-Specific Corpora'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  },
];

  const logos = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Disney', 'Airtel', 'OpenAI', 'Anthropic', 'Samsung'];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Section - UNCHANGED in layout as requested, but colors updated via CSS */}
      <section className="relative px-6 md:px-12 py-16 md:py-32 pt-28 md:pt-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] text-navy mb-8 tracking-tight">
              Language Solutions <br />
              That Power <span className="text-orange-accent">AI</span> and <br />
              <span className="text-orange-accent">Global</span> Communication
            </h1>
            <p className="text-lg text-navy/60 mb-10 max-w-lg leading-relaxed font-medium">
              Alpha Solutions delivers accurate, scalable, and high-quality language services for AI companies, enterprises, and global platforms.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link to="/contact" className="btn-primary !py-4 font-bold text-base flex items-center justify-center">
                Get Started
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/services" className="btn-secondary !py-4 font-bold text-base border border-alpha-border text-center hover:border-orange-accent/30">
                Explore Services
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-orange-accent">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                  <span className="ml-2 text-navy font-bold text-sm">5.0</span>
                </div>
                <p className="text-[11px] text-navy/50 font-bold uppercase tracking-wider">Trusted by 100+ Clients Worldwide</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center">
              <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] bg-white rounded-full shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-alpha-border flex items-center justify-center relative z-20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-alpha-grey to-white" />
                <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 text-navy fill-current relative z-10 transition-transform duration-700 group-hover:scale-110">
                  <path d="M50 10 C 25 10 10 25 10 50 C 10 75 25 90 50 90 C 60 90 70 85 75 80 L 75 50 L 50 50 L 50 65 L 60 65 L 60 75 C 55 78 52 78 50 78 C 35 78 25 68 25 50 C 25 32 35 22 50 22 C 55 22 62 25 65 28 L 75 18 C 68 12 60 10 50 10 Z" />
                </svg>
              </div>

              {[
                { name: 'Translation', icon: '文/A', pos: 'top-[5%] left-[50%] -translate-x-1/2' },
                { name: 'Transcription', icon: '🔊', pos: 'top-[20%] right-[0%]' },
                { name: 'Proofreading', icon: '📝', pos: 'bottom-[30%] -right-[5%]' },
                { name: 'Voice Collection', icon: '🎙️', pos: 'bottom-[0%] left-[50%] -translate-x-1/2' },
                { name: 'Subtitling', icon: 'CC', pos: 'top-[45%] -left-[5%]' },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, idx % 2 === 0 ? 15 : -15, 0] }}
                  transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute ${service.pos} z-30`}
                >
                  <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-[20px] shadow-xl border border-alpha-border flex flex-col items-center group cursor-pointer hover:border-orange-accent transition-colors">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-alpha-grey rounded-xl mb-2 flex items-center justify-center text-navy font-bold text-lg group-hover:bg-orange-accent/10 transition-colors">
                      {service.name === 'Subtitling' ? <span className="bg-orange-accent text-white px-1.5 py-0.5 rounded text-xs font-black">CC</span> : service.icon}
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-navy whitespace-nowrap">{service.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1. TRUST STRIP (MODERN SCROLLING) */}
      <section className="py-12 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-white to-transparent z-10" />
        <p className="text-center text-[11px] font-bold text-navy/30 uppercase tracking-[0.4em] mb-10">
          Trusted by AI teams & global businesses
        </p>
        <div className="flex w-fit animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="mx-12 flex items-center justify-center">
              <span className="text-2xl font-sans font-bold text-navy/20 hover:text-navy/40 transition-colors whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION (CLEAN CORPORATE DESIGN) */}
      <section className="py-24 md:py-40 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-gray-50/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side: Professional Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-alpha-border relative z-10 group">
                <img 
                  src="https://images.unsplash.com/photo-1522071823991-b9671f99128f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Alpha Solutions Team" 
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-navy/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              {/* Subtle Decorative Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-accent/5 rounded-full blur-2xl" />
            </motion.div>

            {/* Right Side: Structured Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              <span className="text-[10px] font-black text-navy/40 uppercase tracking-[0.5em] mb-4 block">About Us</span>
              <div className="mb-10">
                <h2 className="text-4xl md:text-5xl font-sans font-semibold text-navy mb-4 leading-tight">
                  About Alpha Solutions
                </h2>
                <div className="w-16 h-1 bg-orange-accent rounded-full" />
              </div>
              
              <div className="space-y-8 max-w-xl">
                <p className="text-base md:text-lg text-navy/60 font-medium leading-relaxed">
                  Alpha Solutions is a professional AI and language services company helping businesses manage and scale multilingual operations efficiently.
                </p>
                <p className="text-base md:text-lg text-navy/60 font-medium leading-relaxed">
                  We focus on delivering structured, high-quality solutions that simplify complex workflows and improve productivity across global businesses.
                </p>
                <p className="text-base md:text-lg text-navy/60 font-medium leading-relaxed">
                  Our approach is built on clarity, consistency, and delivering reliable results that support long-term growth.
                </p>
              </div>

              <Link to="/contact" className="mt-12 group flex items-center space-x-3 text-sm font-black text-navy uppercase tracking-widest">
                <span>Contact Our Specialists</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 2. SERVICES (STRUCTURED ENTERPRISE PANEL) */}
      <section className="bg-[#F9FAFB] py-24 md:py-40 relative overflow-hidden">
        {/* Subtle Background Blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header - Left Aligned */}
          <motion.div {...fadeInUp} className="mb-20 max-w-3xl">
            <span className="text-[10px] font-black text-orange-accent uppercase tracking-[0.5em] mb-4 block">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-navy mb-6 leading-tight">
              Language & AI Solutions for <br /> Modern Businesses
            </h2>
            <div className="w-24 h-1 bg-orange-accent mb-8 rounded-full" />
            <p className="text-xl text-navy/50 font-medium leading-relaxed max-w-2xl">
              Clear, scalable services designed to support global communication and AI systems.
            </p>
          </motion.div>

          {/* MAIN CONTAINER BOX */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-alpha-border overflow-hidden"
          >
            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-alpha-border">
              {[services[0], services[1]].map((service, i) => (
                <div key={i} className="p-10 md:p-16 hover:bg-alpha-grey/30 transition-colors group">
                  <h3 className="text-2xl font-sans font-semibold text-navy mb-4 group-hover:text-orange-accent transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-navy/50 font-normal leading-relaxed mb-8 max-w-sm">
                    {service.desc}
                  </p>
                  <div className="space-y-4 mb-10">
                    {service.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-orange-accent rounded-full" />
                        <span className="text-xs font-black text-navy/70 tracking-tight">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="inline-flex items-center text-[10px] font-black text-navy uppercase tracking-widest group/link">
                    <span className="relative">
                      Learn More
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-accent group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <svg className="w-3 h-3 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="h-[1px] bg-alpha-border w-full" />

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-alpha-border">
              {[services[2], services[3]].map((service, i) => (
                <div key={i} className="p-10 md:p-16 hover:bg-alpha-grey/30 transition-colors group">
                  <h3 className="text-2xl font-sans font-semibold text-navy mb-4 group-hover:text-orange-accent transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-navy/50 font-normal leading-relaxed mb-8 max-w-sm">
                    {service.desc}
                  </p>
                  <div className="space-y-4 mb-10">
                    {service.points.map((pt, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-orange-accent rounded-full" />
                        <span className="text-xs font-black text-navy/70 tracking-tight">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="inline-flex items-center text-[10px] font-black text-navy uppercase tracking-widest group/link">
                    <span className="relative">
                      Learn More
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-accent group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <svg className="w-3 h-3 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="h-[1px] bg-alpha-border w-full" />

            {/* ROW 3 (SPECIAL) */}
            <div className="bg-orange-accent/[0.02] p-10 md:p-16 lg:p-20 hover:bg-orange-accent/[0.04] transition-colors group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl md:text-4xl font-sans font-semibold text-navy mb-6 group-hover:text-orange-accent transition-colors duration-300">
                    {services[4].title}
                  </h3>
                  <p className="text-lg text-navy/50 font-normal leading-relaxed mb-10 max-w-lg">
                    {services[4].desc}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {services[4].points.map((pt, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-orange-accent rounded-full" />
                        <span className="text-xs font-black text-navy/70 tracking-tight">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-primary !px-10 !py-4 inline-flex items-center">
                    <span>Contact an Expert</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-alpha-border bg-white">
                    <img src={services[4].image} alt={services[4].title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-accent/10 rounded-full blur-2xl group-hover:bg-orange-accent/20 transition-all duration-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2.5 INDUSTRIES WE WORK WITH */}
      <section className="py-24 md:py-32 bg-[#F9FAFB] border-y border-alpha-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div {...fadeInUp} className="mb-20">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-navy mb-6">Industries We Work With</h2>
            <p className="text-xl text-navy/50 font-normal max-w-2xl leading-relaxed">
              We build intelligent automation and digital solutions for modern, data-driven industries.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI & Technology Companies",
                desc: "Building automation systems, data workflows, and scalable AI-driven platforms.",
                icon: (
                  <svg className="w-5 h-5 text-orange-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Media & Content Platforms",
                desc: "Automating content processing, transcription, and large-scale media workflows.",
                icon: (
                  <svg className="w-5 h-5 text-orange-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                )
              },
              {
                title: "SaaS & Digital Products",
                desc: "Enhancing product operations, automation, and backend systems for scalability.",
                icon: (
                  <svg className="w-5 h-5 text-orange-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              },
              {
                title: "Startups & Growing Businesses",
                desc: "Helping fast-growing teams streamline processes and scale efficiently.",
                icon: (
                  <svg className="w-5 h-5 text-orange-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: "Customer Support & BPO",
                desc: "Improving response time, automation, and service quality using AI systems.",
                icon: (
                  <svg className="w-5 h-5 text-orange-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              },
              {
                title: "Data-Driven Organizations",
                desc: "Designing intelligent reporting, dashboards, and data automation systems.",
                icon: (
                  <svg className="w-5 h-5 text-orange-accent" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              }
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl border border-alpha-border hover:border-orange-accent/30 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-10 h-10 bg-alpha-grey rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-accent/5 transition-colors">
                  {industry.icon}
                </div>
                <h3 className="text-base font-sans font-bold text-navy mb-3">{industry.title}</h3>
                <p className="text-sm text-navy/50 font-normal leading-relaxed">{industry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE DEMO SECTION (NEW) */}
      <section className="py-24 md:py-48 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div {...fadeInUp} className="mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-navy mb-8">See Our Services in Action</h2>
            <p className="text-xl text-navy/50 font-normal max-w-2xl mx-auto leading-relaxed">
              Experience the precision of our language intelligence platform through this brief architectural walkthrough.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative max-w-5xl mx-auto group cursor-pointer"
          >
            <div className="aspect-video rounded-[40px] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.18)] border border-alpha-border relative">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Demo Video" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ring-8 ring-white/10">
                   <svg className="w-10 h-10 text-orange-accent fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
            {/* Decorative Blurs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-accent/8 blur-[100px] rounded-full -z-10" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-navy/10 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 7. FINAL CTA (PREMIUM WITH SOFT GRADIENT) */}
      <section className="section-padding bg-linear-to-b from-white to-orange-accent/[0.03]">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-navy mb-8 leading-tight tracking-tight">
            Ready to scale your <br /> language intelligence?
          </h2>
          <p className="text-lg md:text-xl text-navy/50 font-normal mb-12 max-w-2xl mx-auto">
            Partner with the world's most trusted data platform for AI, enterprise, and global communication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary !px-12 !py-5 text-base shadow-[0_15px_30px_rgba(249,115,22,0.3)]"
            >
              Get Started Now
            </button>
            <Link to="/contact" className="btn-secondary !px-12 !py-5 text-base border-navy/10 hover:border-navy/20">Talk to Sales</Link>
          </div>
        </motion.div>
      </section>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
