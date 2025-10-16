import React, { useState, useEffect } from 'react';
import ComicUploadForm from '../components/ComicUploadForm';
import ComicList from '../components/ComicList';

const WriterDashboard = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        fetchComics();
    }, []);

    const fetchComics = async () => {
        try {
            const response = await fetch('/api/comics'); // Adjust the API endpoint as needed
            const data = await response.json();
            setComics(data);
        } catch (error) {
            console.error('Error fetching comics:', error);
        }
    };

    return (
        <div>
            <h1>Writer Dashboard</h1>
            <ComicUploadForm fetchComics={fetchComics} />
            <h2>Your Comics</h2>
            <ComicList comics={comics} />
        </div>
    );
};

export default WriterDashboard;