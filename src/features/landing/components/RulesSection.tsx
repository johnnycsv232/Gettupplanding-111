'use client';

export default function RulesSection() {
  return (
    <section className="py-24 bg-black text-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="border border-white/10 p-12 bg-white/5 rounded-none backdrop-blur-sm">
          <h2 className="font-display text-3xl text-white mb-8">THE RULES</h2>
          <ul className="space-y-4 text-off-white/70 font-mono text-sm">
            <li>01. 50% DEPOSIT REQUIRED TO BOOK DATE.</li>
            <li>02. NO REFUNDS. IF WE SHOOT, YOU PAY.</li>
            <li>03. WE OWN THE FOOTAGE UNTIL FINAL PAYMENT.</li>
            <li>04. DON&apos;T TOUCH THE CAMERAS.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
