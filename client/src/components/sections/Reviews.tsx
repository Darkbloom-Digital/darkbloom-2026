import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Austin Calfee",
    company: "Toyota of Cleveland",
    review: "I reached out to Robbie about building a website to help grow my business and had a meeting scheduled in no time to discuss exactly what I was wanting. He helped me fine tune what was necessary and what wasn't needed, was patient with me while I got all the information he needed to him, and delivered an excellent product that exceeded expectations. I will definitely use him again in the future.",
    rating: 5,
  },
  {
    name: "Joe Henderson",
    company: "JFHenderson Law",
    review: "Excellent in every respect. Super competent, super fast, great communication, confirmed that every detail was as I hoped, and even offered some helpful suggestions for the best way to achieve my goals. He also identified some issues that were getting in the way of keeping my site updated and fixed them lickety split!",
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
    <section id="reviews" className="py-24 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            What Our Clients <span className="text-[#e61e50]">Are Saying</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-12 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-white/10 pt-6 flex flex-col"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#e61e50] text-[#e61e50]" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed flex-1">"{review.review}"</p>
              <div className="mt-6">
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
