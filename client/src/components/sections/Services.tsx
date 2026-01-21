import { motion } from "framer-motion";
import { ShoppingBag, Code, BarChart3, Layers, Globe, Smartphone, Monitor, AppWindow } from "lucide-react";
import shopifyImg from "@assets/generated_images/modern_3d_ecommerce_dashboard_visualization.png";

const shopifyServices = [
  {
    icon: <ShoppingBag className="w-8 h-8 text-[#e61e50]" />,
    title: "Shopify Development",
    description: "Custom themes and storefronts built from scratch to match your brand identity perfectly. No generic templates.",
  },
  {
    icon: <Code className="w-8 h-8 text-[#e61e50]" />,
    title: "Custom App Integration",
    description: "Seamless integration of third-party apps and development of custom functionalities to extend your store.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-[#e61e50]" />,
    title: "Store Management",
    description: "Ongoing support, updates, and optimization to keep your store running at peak performance.",
  },
  {
    icon: <Layers className="w-8 h-8 text-[#e61e50]" />,
    title: "Migration Services",
    description: "Safe and secure migration from other platforms (WooCommerce, Magento) to Shopify Plus.",
  },
];

const additionalServices = [
  {
    icon: <Monitor className="w-10 h-10 text-[#e61e50]" />,
    title: "Custom Web Development",
    description: "Beyond ecommerce, we build stunning websites, web applications, and digital platforms tailored to your business needs. From landing pages to complex portals.",
  },
  {
    icon: <AppWindow className="w-10 h-10 text-[#e61e50]" />,
    title: "App Development",
    description: "Native and cross-platform mobile applications that extend your brand's reach. iOS, Android, and progressive web apps built with modern technologies.",
  },
];

export default function Services() {
  return (
    <section id="shopify" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
             <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Shopify Expertise <br />
                <span className="text-white/40">That Drives Growth</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                We don't just build websites; we engineer ecommerce experiences. As Shopify specialists, we understand the nuances of the platform better than anyone. From liquid coding to checkout customization, we unlock the full potential of your store.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {shopifyServices.map((service, index) => (
                  <div key={index} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[#e61e50]/30 transition-colors group">
                    <div className="mb-4 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-[#e61e50]/10 transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-white/50">{service.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#e61e50]/10">
                <img src={shopifyImg} alt="Shopify Dashboard" className="w-full" />
                
                {/* Overlay Elements */}
                <div className="absolute top-1/4 -left-10 glass-card p-4 rounded-xl border border-white/10 flex items-center gap-4 animate-float">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Conversion Rate</p>
                    <p className="text-lg font-bold">+128%</p>
                  </div>
                </div>

                 <div className="absolute bottom-10 -right-5 glass-card p-4 rounded-xl border border-white/10 flex items-center gap-4 animate-float-delayed">
                  <div className="w-10 h-10 rounded-full bg-[#e61e50]/20 flex items-center justify-center text-[#e61e50]">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Mobile Sales</p>
                    <p className="text-lg font-bold">$42.5k</p>
                  </div>
                </div>

              </div>
              
              {/* Glow effect behind image */}
              <div className="absolute -inset-10 bg-[#e61e50] opacity-20 blur-[100px] -z-10" />
            </motion.div>
          </div>

        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Beyond Shopify
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Our expertise extends beyond ecommerce. We deliver full-stack digital solutions for businesses ready to grow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#e61e50]/30 transition-all group hover:scale-[1.02]">
                <div className="mb-5 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-[#e61e50]/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/50 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
