'use client';
import { motion } from 'motion/react';

export default function CTASection() {
    return (
        <section className="relative z-10 overflow-hidden py-40">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500 via-orange-600 to-amber-900 animate-gradient-xy" />
            
            <div className="relative container mx-auto flex flex-col items-center px-6 text-center">
                <div className="mb-10 max-w-3xl">
                    <h2 className="font-outfit text-5xl font-bold text-white md:text-8xl">
                        Ready to brew?
                    </h2>
                    <p className="mt-6 text-xl text-white/90">
                        Join the revolution of taste. Order your starter kit today.
                    </p>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-24 w-64 items-center justify-center rounded-full bg-white text-amber-900 shadow-2xl transition-all"
                >
                    <span className="font-outfit text-xl font-bold tracking-widest uppercase">Get Started</span>
                    <div className="absolute -inset-1 rounded-full border border-white/50 opacity-0 transition-opacity group-hover:opacity-100 scale-110" />
                </motion.button>
            </div>
            
             {/* Simple grain overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }}></div>
        </section>
    );
}
