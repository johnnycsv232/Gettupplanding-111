'use client';

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 bg-deep-void-black text-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-4xl md:text-5xl text-red-500">THE PROBLEM</h2>
          <p className="text-xl text-off-white/80 font-light leading-relaxed">
            Your events are legendary. But your content? It looks like it was shot on a toaster in 2014. 
            Blurry photos. Shaky iPhone footage. Zero storytelling. <br/><br/>
            <strong className="text-white">You are losing money every time someone lands on your Instagram.</strong>
          </p>
        </div>
        <div className="space-y-6 text-right">
          <h2 className="font-display text-4xl md:text-5xl text-vegas-gold text-shadow-glow">THE SOLUTION</h2>
          <p className="text-xl text-off-white/80 font-light leading-relaxed">
            <strong className="text-vegas-gold">Liquid Glass.</strong> Cinema-grade 4K visuals. Professional color grading. 
            Edits that move to the beat of your club. <br/><br/>
            We don&apos;t just &quot;take photos.&quot; We manufacture authority. When we shoot, you look expensive.
          </p>
        </div>
      </div>
    </section>
  );
}
