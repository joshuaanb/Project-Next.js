'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
    {
        quote: "The best coffee experience I've ever had. Truly magical.",
        author: "Sarah J.",
        role: "Coffee Enthusiast"
    },
    {
        quote: "Every sip tells a story. The attention to detail is unmatched.",
        author: "Michael C.",
        role: "Barista Champion"
    },
    {
        quote: "Tuku isn't just coffee, it's a lifestyle. Obsessed.",
        author: "Jessica L.",
        role: "Designer"
    }
];

export default function TestimonialSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative z-10 w-full overflow-hidden bg-amber-950 py-32 text-[#fdfaf5]">
            <div className="container mx-auto px-6">
                <div className="relative h-[400px] w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center"
                        >
                            <p className="mb-8 font-outfit text-4xl font-light italic leading-snug md:text-6xl max-w-4xl">
                                &quot;{testimonials[index].quote}&quot;
                            </p>
                            <div>
                                <h4 className="font-outfit text-xl font-bold">{testimonials[index].author}</h4>
                                <span className="text-white/60">{testimonials[index].role}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                {/* Indicators */}
                <div className="flex justify-center gap-4 mt-8">
                    {testimonials.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setIndex(i)}
                            className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
