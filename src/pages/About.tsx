import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function About() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hero */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-navy leading-tight">
            Building the <span className="text-orange-accent">Linguistic Foundation</span> for AI
          </h1>
          <p className="text-xl text-navy/60 leading-relaxed font-medium">
            Alpha Solutions is a global leader in language intelligence, dedicated to providing the high-quality data that powers the world's most advanced AI systems.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
            <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To bridge the gap between human language and machine intelligence, ensuring that AI systems are accurate, culturally aware, and accessible to everyone, everywhere.
            </p>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-display font-bold mb-6">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A world where AI understands the nuances of every culture and language, fostering global communication and innovation through seamless human-machine collaboration.
            </p>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="aspect-[21/9] rounded-[32px] overflow-hidden mb-32 border border-alpha-border shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
            alt="Alpha Solutions Office"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Global Team */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-display font-bold mb-8">A Global Network of Experts</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our strength lies in our diversity. With a network of over 5,000 linguists, engineers, and subject matter experts across 50+ countries, we provide the local context and technical precision required for modern AI development.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-display font-bold text-orange-accent">50+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Languages</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-orange-accent">5k+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Experts</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-orange-accent">10+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Global Hubs</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-orange-accent">24/7</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Operations</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[24px] overflow-hidden shadow-xl border border-alpha-border">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                alt="Team working together"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
