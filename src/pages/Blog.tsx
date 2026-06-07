import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const posts = [
  {
    title: 'The Future of Multilingual LLMs',
    excerpt: 'How global language intelligence is shaping the next generation of large language models.',
    date: 'March 25, 2026',
    category: 'AI & NLP',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Prompt Engineering: Art or Science?',
    excerpt: 'Exploring the nuances of effective model instruction and iterative refinement.',
    date: 'March 18, 2026',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Ensuring Safety in AI Content',
    excerpt: 'The critical role of expert-driven content moderation in modern AI systems.',
    date: 'March 10, 2026',
    category: 'Safety',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Linguistic Nuance in AI Training',
    excerpt: 'Why cultural context matters more than ever in global machine intelligence.',
    date: 'March 2, 2026',
    category: 'Linguistics',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Blog() {
  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div {...fadeInUp} className="max-w-3xl mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-8">
            Insights in <span className="text-orange-accent">AI & NLP</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Stay updated with the latest trends, research, and expert perspectives in the world of large language models and linguistic intelligence.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
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
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-xs font-bold text-orange-accent uppercase tracking-[0.2em]">{post.category}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{post.date}</span>
              </div>
              <h2 className="text-3xl font-display font-bold mb-4 group-hover:text-orange-accent transition-colors leading-tight">{post.title}</h2>
              <p className="text-gray-500 leading-relaxed mb-6">{post.excerpt}</p>
              <span className="text-sm font-bold text-navy group-hover:text-orange-accent transition-colors flex items-center">
                Read More
                <div className="w-4 h-0.5 bg-navy ml-2 group-hover:bg-orange-accent group-hover:w-8 transition-all" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
