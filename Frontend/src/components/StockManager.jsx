import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockManager = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStock, setNewStock] = useState({ id: '', stock: '' });

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const response = await axios.get('/api/comics');
                setComics(response.data);
            } catch (err) {
                setError('Failed to fetch comics');
            } finally {
                setLoading(false);
            }
        };

        fetchComics();
    }, []);

    const handleStockUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/comics/${newStock.id}`, { stock: newStock.stock });
            setComics(comics.map(comic => comic.id === newStock.id ? { ...comic, stock: newStock.stock } : comic));
            setNewStock({ id: '', stock: '' });
        } catch (err) {
            setError('Failed to update stock');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Manage Comic Stock</h2>
            <ul>
                {comics.map(comic => (
                    <li key={comic.id}>
                        {comic.title} - Stock: {comic.stock}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleStockUpdate}>
                <input
                    type="text"
                    placeholder="Comic ID"
                    value={newStock.id}
                    onChange={(e) => setNewStock({ ...newStock, id: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="New Stock"
                    value={newStock.stock}
                    onChange={(e) => setNewStock({ ...newStock, stock: e.target.value })}
                    required
                />
                <button type="submit">Update Stock</button>
            </form>
        </div>
    );
};

export default StockManager;