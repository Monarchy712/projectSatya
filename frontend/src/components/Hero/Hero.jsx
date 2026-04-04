import './Hero.css';

function Hero(props) {
    // main hero section with stats
    const { stats } = props;
    
    return (
        <section className="hero">
            <h1 className="hero__title">Transparency at its core</h1>
            <div className="hero__stats">
                <div className="stat">Total Tenders: {stats?.total || 12}</div>
                <div className="stat">Active Projects: {stats?.active || 8}</div>
            </div>
        </section>
    );
}

export default Hero;
