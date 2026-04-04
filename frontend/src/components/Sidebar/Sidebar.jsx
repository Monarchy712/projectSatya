import './Sidebar.css';

function Sidebar() {
    // left side navigation logic
    return (
        <aside className="sidebar">
            <div className="sidebar__title">Menu</div>
            <ul className="sidebar__links">
                <li>Dashboard</li>
                <li>Ledger</li>
                <li>Reports</li>
            </ul>
        </aside>
    );
}

export default Sidebar;
