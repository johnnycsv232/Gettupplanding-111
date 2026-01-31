'use client';

export default function ProblemSolutionSection() {
  return (
    <section className="bg-deep-void-black py-24 text-white">
      <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-display text-4xl text-red-500 md:text-5xl">THE PROBLEM</h2>
          <p className="text-xl font-light leading-relaxed text-off-white/80">
            Your events are legendary. But your content? It looks like it was shot on a toaster in
            2014. Blurry photos. Shaky iPhone footage. Zero storytelling. <br />
            <br />
            <strong className="text-white">
              You are losing money every time someone lands on your Instagram.
            </strong>
          </p>
        </div>
        <div className="space-y-6 text-right">
          <h2 className="text-shadow-glow font-display text-4xl text-vegas-gold md:text-5xl">
            THE SOLUTION
          </h2>
          <p className="text-xl font-light leading-relaxed text-off-white/80">
            <strong className="text-vegas-gold">Liquid Glass.</strong> Cinema-grade 4K visuals.
            Professional color grading. Edits that move to the beat of your club. <br />
            <br />
            We don&apos;t just &quot;take photos.&quot; We manufacture authority. When we shoot, you
            look expensive.
          </p>
        </div>
      </div>
    </section>
  );
}
