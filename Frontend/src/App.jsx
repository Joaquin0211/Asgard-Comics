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

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mangas" element={<Mangas />} />
                <Route path="/comics" element={<ComicsMas />} />
                <Route path="/figuras" element={<Figuras />} />
                <Route path="/merchandising" element={<Merchandising />} />
                <Route path="/tcg" element={<TCGJuegos />} />
                <Route path="/food-drink" element={<ComidaBebida />} />
                <Route path="/clothing" element={<Indumentaria />} />
                <Route path="/extras" element={<ExtrasMas />} />
                <Route path="/utilities" element={<Utilidades />} />
                <Route path="/news" element={<News />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/writer-dashboard" element={<WriterDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
            <NewsletterBar />
            <FooterInfo />
        </Router>
    );
};

export default App;
