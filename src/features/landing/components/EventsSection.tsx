'use client';

export default function EventsSection() {
  const brands = ["LIV", "OMNIA", "HAKKASAN", "TAO", "E11EVEN", "MARQUEE"];

  return (
    <section className="py-24 border-y border-white/5 bg-deep-void-black">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-off-white/40 uppercase tracking-[0.5em] mb-12">Trusted by the World&apos;s Best</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, i) => (
            <span key={i} className="font-display text-3xl md:text-5xl text-white hover:text-vegas-gold transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
