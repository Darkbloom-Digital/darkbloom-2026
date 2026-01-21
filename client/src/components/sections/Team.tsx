import { motion } from "framer-motion";
import poppyImg from "@assets/Remove_background_project-2_1768960690269.png";
import robImg from "@assets/Rob_1768961985749.png";

const teamMembers = [
  {
    name: "Rob Davis",
    role: "Founder & Lead Developer",
    bio: "Shopify expert and full-stack developer passionate about building high-converting ecommerce experiences.",
    image: robImg,
  },
  {
    name: "Poppy",
    role: "Director of Barketing",
    bio: "Poppy joined the team in 2021 with no prior experience and a lot of enthusiasm. While her resume was mostly blank (and partially chewed), we took a chance on her — and we're glad we did. Now she oversees brand vibes, audience engagement, and sniffing out new opportunities.",
    image: poppyImg,
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#e61e50]/30 transition-all text-center"
            >
              {member.image ? (
                member.name === "Poppy" ? (
                  <div className="overflow-hidden rounded-xl mx-auto mb-6 border-2 border-[#e61e50]/30" style={{ maxHeight: '280px' }}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="rounded-xl mx-auto mb-6 border-2 border-[#e61e50]/30"
                  />
                )
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e61e50] to-[#e61e50]/50 mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
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
