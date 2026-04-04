import './Navbar.css';

function Navbar() {
    // top navigation logic yahan start hogi
    return (
        <nav className="navbar">
            <div className="navbar__logo">Satya Platform</div>
            <ul className="navbar__links">
                <li>Home</li>
                <li>Tenders</li>
                <li>Oversight</li>
            </ul>
        </nav>
    );
}

export default Navbar;
