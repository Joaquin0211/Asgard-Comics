import React from 'react';
import { useEffect, useState } from 'react';
import PurchaseHistory from '../components/PurchaseHistory';
import ComicList from '../components/ComicList';

const UserDashboard = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('/api/comics');
                const data = await response.json();
                setComics(data);
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>Your Purchase History</h2>
            <PurchaseHistory />
            <h2>Available Comics</h2>
            <ComicList comics={comics} />
        </div>
    );
};

export default UserDashboard;