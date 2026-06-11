import { motion } from "framer-motion";
import poppyImg from "@assets/optimized/poppy.webp";
import robImg from "@assets/optimized/rob.webp";

const teamMembers = [
  {
    name: "Rob",
    role: "Founder & Lead Developer",
    bio: "With over five years of experience, Rob works closely with businesses to support real goals and long-term direction through their websites.",
    image: robImg,
  },
  {
    name: "Poppy",
    role: "Director of Barketing",
    bio: "Poppy joined the team in 2021 with no prior experience and a lot of enthusiasm. While her resume was mostly blank (and partially chewed), we took a chance on her and we're glad we did. Now she oversees brand vibes, audience engagement, and sniffing out new opportunities.",
    image: poppyImg,
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Meet the People <span className="text-[#e61e50]">Behind the Work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {member.image ? (
                member.name === "Poppy" ? (
                  <div className="overflow-hidden rounded-xl mx-auto mb-6 border-2 border-[#e61e50]/30" style={{ maxHeight: '220px' }}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full"
                      style={{ marginTop: '-20px' }}
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
