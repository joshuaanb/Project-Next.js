'use client';

export default function BentoSection() {
    return (
        <section className="relative z-10 bg-[#fdfaf5] py-20">
             <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-full min-h-[800px]">
                    <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-amber-100 relative overflow-hidden group">
                        <img 
                            src="/assets/premium_coffee.png" 
                            alt="Premium Coffee Beans" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/0 transition-colors duration-500" />
                        <div className="absolute bottom-8 left-8 z-10">
                            <h3 className="text-3xl font-outfit font-bold text-white shadow-sm">Premium Roasts</h3>
                            <p className="font-outfit text-amber-50 shadow-sm">Discover our signature blends.</p>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-stone-100 relative overflow-hidden p-8 flex flex-col justify-end">
                        <h3 className="text-2xl font-outfit font-bold text-amber-950">Equipment</h3>
                        <p className="font-outfit text-amber-800">For the perfect brew.</p>
                    </div>
                    <div className="rounded-3xl bg- stone-100 relative overflow-hidden p-8 flex flex-col justify-end group">
                        <img 
                            src="/assets/workshop.png" 
                            alt="Workshops" 
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100" 
                        />
                         <h3 className="relative z-10 text-2xl font-outfit font-bold text-amber-950 group-hover:text-white transition-colors">Workshops</h3>
                         <p className="relative z-10 font-outfit text-amber-800 group-hover:text-amber-50 transition-colors">Learn from the masters.</p>
                    </div>
                </div>
             </div>
        </section>
    )
}
