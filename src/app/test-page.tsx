export default function TestPage() {
  return (
    <main className="min-h-screen bg-deep-void text-off-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-4xl font-bold text-vegas-gold">GETTUPP Test Page</h1>
        <p className="mb-4 text-lg">This is a minimal test to verify the page loads correctly.</p>
        <div className="glass-medium rounded-lg p-6">
          <h2 className="mb-2 text-2xl font-semibold">Glassmorphism Test</h2>
          <p>If you can see this with a glass effect, the styling is working.</p>
        </div>
      </div>
    </main>
  );
}
