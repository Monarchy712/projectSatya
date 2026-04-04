import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Hero from './components/Hero/Hero';
import Ledger from './components/Ledger/Ledger';
import TendersPage from './components/Tenders/TendersPage';

import './App.css';

function Dashboard() {
    // main dashboard logic
    return (
        <div className="app">
            <Navbar />
            <div className="app__layout">
                <Sidebar />
                <main className="app__main">
                    <Hero />
                    <Ledger />
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/tenders" element={<TendersPage />} />
            <Route path="/*" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
