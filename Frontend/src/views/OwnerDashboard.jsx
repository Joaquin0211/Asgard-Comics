import React, { useEffect, useState } from 'react';
import StockManager from '../components/StockManager';
import ComicList from '../components/ComicList';

const OwnerDashboard = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchComics = async () => {
            const response = await fetch('/api/comics'); // Adjust the API endpoint as needed
            const data = await response.json();
            setComics(data);
        };

        fetchComics();
    }, []);

    return (
        <div>
            <h1>Owner Dashboard</h1>
            <StockManager comics={comics} />
            <h2>Available Comics</h2>
            <ComicList comics={comics} />
        </div>
    );
};

export default OwnerDashboard;