import React from 'react';
import ComicList from '../components/ComicList';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Comic Store</h1>
            <p>Explore our collection of comics below:</p>
            <ComicList />
        </div>
    );
};

export default Home;