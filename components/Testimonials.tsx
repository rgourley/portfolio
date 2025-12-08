"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      image: "/images/will.avif",
      name: "Will Ross",
      role: "CEO & Co-Founder",
      company: "Federato",
      text: "Great design without compromise. That is what you get working with Robert Gourley. He will push you and your product to new heights. If product design excellence is what you are truly after but you feel blocked or aren't quite sure how to get there, look no further.",
    },
    {
      image: "/images/asia.avif",
      name: "Asia Giles",
      role: "VP",
      company: "Prudential Financial",
      text: "Robert is someone you want to be around. Besides being an stellar thinker and designer, he is an awesome individual. Inspirational and genuine. Always dependable and easy to work with he has a knack for making it look effortless.",
    },
    {
      image: "/images/amy.avif",
      name: "Amy Maniatis",
      role: "EVP & CMO",
      company: "National Geographic",
      text: "Robert is simply as good as it gets when it comes to collaborating on pioneering innovative and cool ways to reach and engage your audience. The work we were able to create together at Nimblefish, CafePress and later at National Geographic was not only the most FUN but the most creative and impactful.",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">Testimonials</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="glass p-8 rounded-lg border border-foreground/10 flex flex-col items-center text-center transition-all duration-300 hover:border-foreground/30 hover:shadow-xl hover:shadow-foreground/10 cursor-pointer"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={64}
                height={64}
                className="rounded-full mb-6"
              />
              <p className="text-xl text-foreground/65 font-light mb-6 flex-1">
                "{testimonial.text}"
              </p>
              <div className="text-sm font-light">
                <p className="text-foreground/90">{testimonial.name}</p>
                <p className="text-foreground/50">{testimonial.role}, {testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

