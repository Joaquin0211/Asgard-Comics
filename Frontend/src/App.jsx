import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import OwnerDashboard from './views/OwnerDashboard';
import WriterDashboard from './views/WriterDashboard';
import UserDashboard from './views/UserDashboard';
import Navbar from './components/Navbar';
import NewsletterBar from './components/NewsletterBar';
import FooterInfo from './components/FooterInfo';
import Mangas from './views/Mangas';
import ComicsMas from './views/ComicsMas';
import Figuras from './views/Figuras';
import Merchandising from './views/Merchandising';
import TCGJuegos from './views/TCGJuegos';
import ComidaBebida from './views/ComidaBebida';
import Indumentaria from './views/Indumentaria';
import ExtrasMas from './views/ExtrasMas';
import Utilidades from './views/Utilidades';
import News from './views/News';
import PriceFilterComponent from './components/PriceFilterComponent';
import TestEndpoints from './components/TestEndpoints';
import CartDebugComponent from './components/CartDebugComponent';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Páginas con layout especial (sin padding) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Páginas con layout normal (con padding para navbar) */}
                <Route path="/" element={<div className="main-content"><Home /></div>} />
                <Route path="/mangas" element={<div className="main-content"><Mangas /></div>} />
                <Route path="/comics" element={<div className="main-content"><ComicsMas /></div>} />
                <Route path="/figuras" element={<div className="main-content"><Figuras /></div>} />
                <Route path="/merchandising" element={<div className="main-content"><Merchandising /></div>} />
                <Route path="/tcg" element={<div className="main-content"><TCGJuegos /></div>} />
                <Route path="/food-drink" element={<div className="main-content"><ComidaBebida /></div>} />
                <Route path="/clothing" element={<div className="main-content"><Indumentaria /></div>} />
                <Route path="/extras" element={<div className="main-content"><ExtrasMas /></div>} />
                <Route path="/utilities" element={<div className="main-content"><Utilidades /></div>} />
                <Route path="/news" element={<div className="main-content"><News /></div>} />
                <Route path="/owner-dashboard" element={<div className="main-content"><OwnerDashboard /></div>} />
                <Route path="/writer-dashboard" element={<div className="main-content"><WriterDashboard /></div>} />
                <Route path="/user-dashboard" element={<div className="main-content"><UserDashboard /></div>} />
                <Route path="/price-filter" element={<div className="main-content"><PriceFilterComponent /></div>} />
                <Route path="/test-endpoints" element={<div className="main-content"><TestEndpoints /></div>} />
                <Route path="/cart-debug" element={<div className="main-content"><CartDebugComponent /></div>} />
            </Routes>
            <NewsletterBar />
            <FooterInfo />
        </Router>
    );
};

export default App;
