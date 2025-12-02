"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "John Doe",
      role: "CEO",
      company: "Tech Solutions",
      text: "Rob's design thinking transformed our product. His ability to simplify complex problems into elegant solutions is unmatched. A true asset to any team.",
    },
    {
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Jane Smith",
      role: "Product Manager",
      company: "Innovate Corp",
      text: "Working with Rob was a game-changer. He brought clarity and creativity to our most challenging projects, always delivering exceptional user experiences.",
    },
    {
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      name: "Mike Johnson",
      role: "Lead Engineer",
      company: "DevOps Inc.",
      text: "Rob bridges the gap between design and engineering seamlessly. His prototypes are always spot-on, making development efficient and enjoyable.",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
            </div>
            <span className="text-lg font-light text-foreground/60">Testimonials</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-lg border border-foreground/10 flex flex-col items-center text-center"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full mb-6 border border-foreground/20"
              />
              <p className="text-lg text-foreground/70 font-light mb-6 flex-1">
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

