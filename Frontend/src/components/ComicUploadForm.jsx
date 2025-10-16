import React, { useState } from 'react';

const ComicUploadForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('file', file);

        try {
            const response = await fetch('/api/comics/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Comic uploaded successfully!');
                setTitle('');
                setAuthor('');
                setPrice('');
                setStock('');
                setFile(null);
            } else {
                setMessage('Failed to upload comic.');
            }
        } catch (error) {
            setMessage('An error occurred while uploading the comic.');
        }
    };

    return (
        <div>
            <h2>Upload Your Comic</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">Upload Comic</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ComicUploadForm;