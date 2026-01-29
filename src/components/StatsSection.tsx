'use client';
import { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsSection() {
    return (
        <section className="relative z-10 bg-white py-32">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="text-center">
                        <h3 className="mb-2 font-outfit text-6xl font-bold text-amber-950">
                            <Counter value={500} suffix="+" />
                        </h3>
                        <p className="font-outfit text-lg text-amber-800">Farmers Partnered</p>
                    </div>
                    <div className="text-center">
                        <h3 className="mb-2 font-outfit text-6xl font-bold text-amber-950">
                            <Counter value={12000} suffix="" />
                        </h3>
                        <p className="font-outfit text-lg text-amber-800">Cups Served Daily</p>
                    </div>
                    <div className="text-center">
                        <h3 className="mb-2 font-outfit text-6xl font-bold text-amber-950">
                            <Counter value={100} suffix="%" />
                        </h3>
                        <p className="font-outfit text-lg text-amber-800">Sustainable Sourcing</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
