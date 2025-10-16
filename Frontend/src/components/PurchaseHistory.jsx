import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PurchaseHistory = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('/api/purchases'); // Adjust the endpoint as necessary
                setPurchases(response.data);
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div>
            <h2>Purchase History</h2>
            {purchases.length === 0 ? (
                <p>No purchases found.</p>
            ) : (
                <ul>
                    {purchases.map((purchase) => (
                        <li key={purchase.id}>
                            {purchase.comicTitle} - {new Date(purchase.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PurchaseHistory;