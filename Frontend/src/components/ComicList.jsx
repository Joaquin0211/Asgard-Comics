import React, { useEffect, useState } from 'react';
import ComicCard from './ComicCard';

const ComicList = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await fetch('/api/comics'); // Adjust the API endpoint as needed
                const data = await response.json();
                setComics(data);
            } catch (error) {
                console.error('Error fetching comics:', error);
            }
        };

        fetchComics();
    }, []);

    return (
        <div className="comic-list">
            {comics.length > 0 ? (
                comics.map(comic => (
                    <ComicCard key={comic.id} comic={comic} />
                ))
            ) : (
                <p>No comics available.</p>
            )}
        </div>
    );
};

export default ComicList;