import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, Star } from "lucide-react";
import { Copy } from "@/components/Placeholder";
import { caTechReview } from "@/data/projects";

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
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#e61e50] text-[#e61e50]" aria-hidden="true" />
      ))}
    </div>
  );
}

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

        {/* Featured review: pull quote up front, full review one click away.
            <details> keeps the whole review in the HTML for crawlers. */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-20 text-center"
          data-testid="review-featured"
        >
          <div className="flex justify-center mb-6">
            <Stars count={5} />
          </div>
          <blockquote className="text-2xl md:text-4xl font-heading font-semibold leading-snug mb-6">
            "Working with Darkbloom Digital has been a great business decision.{" "}
            <span className="text-[#e61e50]">Since launching, we've seen significant growth in both website traffic and conversion rates.</span>"
          </blockquote>
          <figcaption className="mb-8">
            <p className="font-semibold"><Copy text={caTechReview.name} /></p>
            <p className="text-white/50 text-sm">
              <Copy text={caTechReview.role} /> ·{" "}
              <Link href="/portfolio/ca-tech-usa" className="text-[#e61e50] hover:text-white transition-colors">
                See the case study
              </Link>
            </p>
          </figcaption>
          <details className="group text-left max-w-3xl mx-auto border-t border-white/10">
            <summary className="flex items-center justify-center gap-2 cursor-pointer list-none py-4 text-sm font-medium text-white/60 hover:text-[#e61e50] transition-colors [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read the full review</span>
              <span className="hidden group-open:inline">Show less</span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="space-y-4 text-white/70 leading-relaxed pb-2">
              {caTechReview.text.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </details>
        </motion.figure>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-white/10 pt-6 flex flex-col"
            >
              <div className="mb-5">
                <Stars count={review.rating} />
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
