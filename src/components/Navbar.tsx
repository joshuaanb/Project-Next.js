'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const menuVariants = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] as const } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
};

const linkVariants = {
    initial: { y: 80, opacity: 0 },
    animate: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay: 0.5 + (i * 0.1), duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }),
    exit: { y: 80, opacity: 0, transition: { duration: 0.5 } }
};

const links = [
    { title: "Our Story", href: "#" },
    { title: "Shop Coffee", href: "#" },
    { title: "Locations", href: "#" },
    { title: "Wholesale", href: "#" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <header className="fixed top-0 left-0 z-50 w-full px-6 py-6 md:px-12">
            <div className="flex items-center justify-between">
                <Link href="/" className="font-outfit text-2xl font-bold tracking-tight text-white mix-blend-difference">
                    TUKU.
                </Link>
                <button 
                    onClick={toggleMenu} 
                    className="group relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                >
                    <span className={`h-0.5 w-8 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`h-0.5 w-8 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                    <span className={`h-0.5 w-8 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 z-40 flex h-screen w-full flex-col items-center justify-center origin-top bg-amber-950 text-[#fdfaf5]"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {links.map((link, i) => (
                                <div key={i} className="overflow-hidden">
                                    <motion.div
                                        custom={i}
                                        variants={linkVariants}
                                        className="font-outfit text-5xl font-bold md:text-7xl"
                                    >
                                        <Link href={link.href} className="hover:text-amber-200 transition-colors" onClick={toggleMenu}>
                                            {link.title}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-12 flex gap-8 font-outfit text-sm uppercase tracking-widest text-amber-200/60">
                            <a href="#" className="hover:text-white">Instagram</a>
                            <a href="#" className="hover:text-white">Twitter</a>
                            <a href="#" className="hover:text-white">LinkedIn</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
