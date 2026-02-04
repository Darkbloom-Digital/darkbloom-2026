import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    company: "Bloom Beauty Co.",
    review: "Working with Darkbloom was a game-changer for our brand. They took our vision and turned it into a stunning Shopify store that our customers love.",
    rating: 5,
  },
  {
    name: "James Chen",
    company: "Atlas Outdoor Gear",
    review: "Professional, responsive, and incredibly talented. Our new website has significantly improved our online presence and conversions.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    company: "Craft & Co. Studio",
    review: "They truly understood what we needed. The attention to detail and commitment to quality exceeded our expectations.",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients <br />
            <span className="text-[#e61e50]">Are Saying</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#e61e50]/30 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#e61e50] text-[#e61e50]" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-6">"{review.review}"</p>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-white/50 text-sm">{review.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
