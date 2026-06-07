import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const services = [
  {
    title: 'Data Annotation for LLMs',
    desc: 'High-precision labeling for text, intent, and sentiment analysis. We provide the ground truth for your models.',
    useCases: ['Sentiment Analysis', 'Entity Recognition', 'Intent Classification'],
    process: ['Data Ingestion', 'Expert Labeling', 'Quality Audit', 'Final Delivery']
  },
  {
    title: 'Translation & Localization',
    desc: 'Native-level cultural adaptation across 50+ global languages. More than just words, we translate context.',
    useCases: ['Software Localization', 'Marketing Adaptation', 'Legal Translation'],
    process: ['Linguistic Analysis', 'Native Translation', 'Cultural Review', 'LQA Testing']
  },
  {
    title: 'Prompt Engineering',
    desc: 'Optimizing model inputs for maximum accuracy and creative output. We help you talk to AI effectively.',
    useCases: ['Model Tuning', 'Creative Writing', 'Technical Support'],
    process: ['Prompt Design', 'Iterative Testing', 'Output Evaluation', 'Refinement']
  },
  {
    title: 'AI Training Data Creation',
    desc: 'Custom datasets built to your specific domain and use case. High-quality data for high-quality models.',
    useCases: ['Domain-Specific LLMs', 'Chatbot Training', 'Voice Recognition'],
    process: ['Requirement Gathering', 'Data Generation', 'Validation', 'Packaging']
  },
  {
    title: 'Linguistic Quality Evaluation',
    desc: 'Rigorous testing of model outputs by human experts. Ensuring your AI speaks naturally and accurately.',
    useCases: ['Model Benchmarking', 'Error Analysis', 'Fluency Testing'],
    process: ['Test Set Design', 'Expert Review', 'Scoring & Feedback', 'Reporting']
  },
  {
    title: 'Content Moderation',
    desc: 'Ensuring safety and compliance through intelligent filtering. Protecting your brand and your users.',
    useCases: ['Community Safety', 'Brand Protection', 'Regulatory Compliance'],
    process: ['Policy Definition', 'Automated Filtering', 'Human Review', 'Continuous Tuning']
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-navy leading-tight">
            Comprehensive <span className="text-orange-accent">Language Solutions</span>
          </h1>
          <p className="text-xl text-navy/60 leading-relaxed font-medium">
            From data annotation to linguistic evaluation, we provide the full spectrum of services required to build world-class AI systems.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-32">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
            >
              <div className={i % 2 === 1 ? 'lg:order-last' : ''}>
                <div className="w-16 h-16 bg-alpha-grey rounded-2xl mb-8 flex items-center justify-center border border-alpha-border">
                  <div className="w-4 h-4 bg-orange-accent rounded-full animate-pulse" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-navy">{service.title}</h2>
                <p className="text-navy/60 mb-10 leading-relaxed text-lg font-medium">{service.desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="text-[10px] font-black text-orange-accent uppercase tracking-[0.3em] mb-4">Use Cases</h4>
                    <ul className="space-y-3">
                      {service.useCases.map((uc, j) => (
                        <li key={j} className="text-sm text-navy/60 flex items-center font-bold">
                          <div className="w-1.5 h-1.5 bg-orange-accent rounded-full mr-3" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-orange-accent uppercase tracking-[0.3em] mb-4">Process</h4>
                    <ul className="space-y-3">
                      {service.process.map((p, j) => (
                        <li key={j} className="text-sm text-navy/60 flex items-center font-bold">
                          <span className="text-orange-accent font-black mr-3">{j + 1}.</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-alpha-border shadow-xl">
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&q=80&w=1200`}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/service${i}/1200/900`;
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
