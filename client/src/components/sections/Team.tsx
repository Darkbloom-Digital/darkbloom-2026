import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Rob Davis",
    role: "Founder & Lead Developer",
    bio: "Shopify expert and full-stack developer passionate about building high-converting ecommerce experiences.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#e61e50]/10 border border-[#e61e50]/30 text-[#e61e50] text-sm font-medium tracking-wider uppercase mb-6">
            The Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet the People <br />
            <span className="text-white/40">Behind the Work</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Dedicated professionals committed to bringing your digital vision to life.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#e61e50]/30 transition-all max-w-md text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e61e50] to-[#e61e50]/50 mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-[#e61e50] font-medium mb-4">{member.role}</p>
              <p className="text-white/50 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
