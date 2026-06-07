import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const jobs = [
  { title: 'Senior NLP Engineer', location: 'Remote / Global', type: 'Full-time' },
  { title: 'Linguistic Quality Lead', location: 'London, UK', type: 'Full-time' },
  { title: 'Data Operations Manager', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Prompt Engineer Specialist', location: 'Remote', type: 'Contract' },
  { title: 'Global Talent Acquisition', location: 'New York, NY', type: 'Full-time' },
  { title: 'Content Moderation Expert', location: 'Singapore', type: 'Full-time' },
];

export default function Careers() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-8">
            Join the <span className="text-orange-accent">Future</span> of AI
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            We're looking for passionate linguists, engineers, and visionaries to help us build the foundation for the next generation of machine intelligence.
          </p>
        </motion.div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-display font-bold mb-8">A Culture of Innovation</h2>
            <div className="space-y-8">
              {[
                { title: 'Global Team', desc: 'Work with experts from over 50 countries in a truly diverse and inclusive environment.' },
                { title: 'Flexible Work', desc: 'We believe in results, not hours. Choose the work environment that suits you best.' },
                { title: 'Cutting-Edge Tech', desc: 'Get hands-on experience with the latest LLMs and AI technologies before they hit the market.' },
                { title: 'Growth Opportunities', desc: 'We invest in our people through continuous learning and career development programs.' },
              ].map((item, i) => (
                <div key={i} className="flex space-x-6">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-orange-accent flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-orange-accent rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[24px] overflow-hidden shadow-xl border border-alpha-border"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
              alt="Team collaboration"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Open Positions */}
        <motion.div {...fadeInUp} className="mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Open Positions</h2>
          <p className="text-gray-500">Find your next challenge at Alpha Solutions.</p>
        </motion.div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-8 flex flex-col md:flex-row justify-between items-center group cursor-pointer"
            >
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-display font-bold group-hover:text-orange-accent transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{job.location} • {job.type}</p>
              </div>
              <button className="btn-outline !py-2 !px-8 group-hover:bg-orange-accent group-hover:text-white group-hover:border-orange-accent transition-all text-[10px]">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
