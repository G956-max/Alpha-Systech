import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const cases = [
  {
    title: 'Multilingual LLM Training',
    client: 'Leading Tech Giant',
    problem: 'The client needed to expand their model to 25 new languages with high cultural accuracy.',
    solution: 'We deployed a network of 300 native linguists to provide high-precision data annotation.',
    results: ['45% Accuracy Boost', '25 New Languages Supported', '99.9% Quality Score'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Global Content Moderation',
    client: 'Social Media Platform',
    problem: 'The platform was struggling with harmful content in non-English languages.',
    solution: 'We implemented a hybrid human-AI moderation system with expert-driven filtering.',
    results: ['99.9% Safety Compliance', 'Real-time Moderation', 'Reduced Brand Risk'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Medical AI Training',
    client: 'Healthcare AI Startup',
    problem: 'The client needed highly specialized medical data annotation for their diagnostic AI.',
    solution: 'We assembled a team of 50 medical doctors and specialists to provide expert labeling.',
    results: ['98% Diagnostic Accuracy', 'Expert-Verified Data', 'Faster Model Training'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Legal Document Analysis',
    client: 'Global Law Firm',
    problem: 'The firm needed to automate the analysis of thousands of legal documents across multiple jurisdictions.',
    solution: 'We provided expert-driven prompt engineering and data creation for their legal AI.',
    results: ['70% Time Savings', 'High Legal Precision', 'Scalable Document Review'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
  }
];

export default function CaseStudies() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-8">
            Measurable <span className="text-orange-accent">Impact</span> in AI
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Explore how Alpha Solutions has helped the world's leading AI labs and enterprises achieve unprecedented accuracy and global reach.
          </p>
        </motion.div>

        {/* Case Studies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/9] rounded-[24px] overflow-hidden mb-8 border border-alpha-border shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs font-bold text-orange-accent uppercase tracking-[0.2em] mb-4">{c.client}</p>
<h2 className="text-3xl font-display font-bold mb-6 group-hover:text-orange-accent transition-colors">{c.title}</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Problem</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Solution</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {c.results.map((r, j) => (
                  <span key={j} className="bg-alpha-grey text-gray-800 px-4 py-2 rounded-full text-xs font-bold border border-alpha-border">
                    {r}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
