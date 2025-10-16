import React from 'react';
import WeeklyNews from '../components/sections/WeeklyNews';
import Preorders from '../components/sections/Preorders';
import Figures from '../components/sections/Figures';
import Promotions from '../components/sections/Promotions';
import Comics from '../components/sections/Comics';
import TradingCards from '../components/sections/TradingCards';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Bienvenidos a Asgard Comics</h1>
                <p>Tu destino para comics, mangas, figuras y más</p>
            </header>

            <main>
                <WeeklyNews />
                <Promotions />
                <Comics />
                <Preorders />
                <Figures />
                <TradingCards />
            </main>
        </div>
    );
};

export default Home;