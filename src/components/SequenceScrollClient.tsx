'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring, MotionValue } from 'motion/react';

const frameCount = 240;

const currentFrame = (index: number) =>
  `/Sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

export default function SequenceScrollClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Framer Motion hooks MUST be at the top level
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    mass: 0.1, 
    stiffness: 100, 
    damping: 20 
  });

  // Load images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = currentFrame(i);
          img.onload = () => {
            loadedImages[i - 1] = img;
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
            resolve();
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      console.log(`✅ Loaded ${loadedImages.filter(img => img).length} images`);
      setImages(loadedImages);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  // Render canvas
  useEffect(() => {
    console.log('🎨 Canvas effect - canvasRef:', canvasRef.current, 'images:', images.length, 'smoothProgress:', smoothProgress);
    
    if (!canvasRef.current || images.length === 0) {
      console.log('⏭️ Skipping canvas render - missing canvas or images');
      return;
    }

    if (smoothProgress === null) {
      console.log('⏭️ Skipping canvas render - smoothProgress not ready');
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('❌ Cannot get canvas context');
      return;
    }

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('📐 Canvas size:', canvas.width, 'x', canvas.height);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const renderFrame = (progress: number) => {
      const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      const img = images[frameIndex];
      
      if (img && img.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    renderFrame(0);
    console.log('🎨 Canvas initialized! First frame rendered');

    const unsubscribe = smoothProgress.on('change', (latest) => {
      renderFrame(latest);
    });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [images, smoothProgress]);

  // Opacity transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 0.9], [0, 1, 1]);

  return (
    <section ref={containerRef} style={{ position: 'relative' }} className="h-[500vh] bg-[#fdfaf5]">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111] text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-outfit text-sm tracking-widest uppercase">Brewing...</p>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="sticky top-0 h-screen w-full object-cover" />
      
      <div className="sticky top-0 left-0 flex h-screen w-full flex-col justify-center pointer-events-none z-10">
        
        <motion.div style={{ opacity: opacity1 }} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-outfit text-6xl font-bold tracking-tight text-amber-950 md:text-9xl">TUKU</h1>
            <p className="mt-4 font-outfit text-xl font-light tracking-wide text-amber-800">The Essence of Bean</p>
          </div>
        </motion.div>

        <motion.div style={{ opacity: opacity2 }} className="absolute inset-0 flex items-center px-10 md:px-32">
          <div className="max-w-xl text-left">
            <h2 className="font-outfit text-4xl font-semibold leading-tight text-amber-950 md:text-6xl">
              Sourced from the highlands.
            </h2>
          </div>
        </motion.div>

        <motion.div style={{ opacity: opacity3 }} className="absolute inset-0 flex items-center justify-end px-10 md:px-32">
          <div className="max-w-xl text-right">
            <h2 className="font-outfit text-4xl font-semibold leading-tight text-amber-950 md:text-6xl">
              Roasted to perfection.
            </h2>
          </div>
        </motion.div>

        <motion.div style={{ opacity: opacity4 }} className="absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto text-center">
            <h2 className="mb-8 font-outfit text-4xl font-bold text-amber-950 md:text-7xl">
              Taste the difference.
            </h2>
            <button className="group relative overflow-hidden rounded-full bg-amber-900 px-8 py-4 text-white transition-all hover:scale-105 hover:bg-amber-800">
              <span className="relative z-10 font-outfit text-lg font-medium tracking-wide">Shop Now</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}