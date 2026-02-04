export default function SimpleTest() {
  return (
    <div
      style={{ padding: '20px', backgroundColor: '#050505', color: '#fafafa', minHeight: '100vh' }}
    >
      <h1 style={{ color: '#d4af37', fontSize: '2rem' }}>GETTUPP Simple Test</h1>
      <p>If you can see this page, Next.js is working.</p>
      <div
        style={{
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h2>Glass Effect Test</h2>
        <p>This should have a glassmorphism effect.</p>
      </div>
    </div>
  );
}
