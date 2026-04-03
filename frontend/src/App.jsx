import React from 'react';

const Navbar = () => (
  <nav className="glass" style={{ position: 'sticky', top: '1rem', zIndex: 100, margin: '1rem 2rem', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(to right, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      SATYA AI
    </div>
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>Features</a>
      <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>About</a>
      <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Get Started</button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
    <h1 className="animate-fade-in">Precision Visual AI for <br/> <span style={{ color: 'var(--primary)' }}>Fault Detection</span></h1>
    <p className="animate-fade-in" style={{ margin: '0 auto 2.5rem auto' }}>
      Satya leverages state-of-the-art computer vision and deep learning to identify anomalies, defects, and contextual inconsistencies in real-time.
    </p>
    <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <button className="btn btn-primary">Start Analyzing</button>
      <button className="btn btn-outline">Watch Demo</button>
    </div>
  </section>
);

const FeatureCard = ({ title, description, icon }) => (
  <div className="glass" style={{ padding: '2rem', flex: 1, minWidth: '300px' }}>
    <div style={{ width: '3rem', height: '3rem', background: 'var(--glass)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
    <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{description}</p>
  </div>
);

const Features = () => (
  <section id="features" className="container" style={{ paddingTop: '10rem', paddingBottom: '10rem' }}>
    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Advanced Capabilities</h2>
      <p style={{ margin: '0 auto' }}>Equipped with the latest ML models for unparalleled accuracy.</p>
    </div>
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <FeatureCard 
        title="Real-Time Detection" 
        description="Process high-resolution video streams with sub-millisecond latency using YOLOv8." 
        icon="⚡"
      />
      <FeatureCard 
        title="Scene Comparison" 
        description="Identify contextual changes and anomalies between frames with our Context Comparator." 
        icon="🔍"
      />
      <FeatureCard 
        title="Gemini Analysis" 
        description="Leverage large language models for detailed natural language reports on detected faults." 
        icon="✨"
      />
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
    <div className="container">
      <p style={{ fontSize: '0.875rem' }}>© 2026 Satya AI. All rights reserved. Built for high-stakes visual inspection.</p>
    </div>
  </footer>
);

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
