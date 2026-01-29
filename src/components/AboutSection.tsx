'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'motion/react';

const text = "We believe coffee is more than just a drink. It's a ritual, a connection, a moment of pause in a chaotic world. From the highlands of Indonesia to your cup, we ensure every bean tells a story of tradition and quality.";

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span className="relative mr-2 lg:mr-3">
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};

export default function AboutSection() {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.25']
    });

    const words = text.split(" ");

    return (
        <section className="relative z-10 bg-[#fdfaf5] py-40">
            <div className="container mx-auto px-6">
                <div ref={element} className="flex flex-wrap text-4xl font-medium leading-tight text-amber-950 md:text-6xl lg:max-w-5xl">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
                    })}
                </div>
            </div>
        </section>
    );
}
