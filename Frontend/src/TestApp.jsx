import React from 'react';

const TestApp = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
            <h1 style={{ color: '#333' }}>🎯 Test - Asgard Comics</h1>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                <h2>✅ React está funcionando!</h2>
                <p>Si puedes ver este mensaje, React se está ejecutando correctamente.</p>
                <ul>
                    <li>✅ Frontend servidor: http://localhost:5173</li>
                    <li>🔄 Backend servidor: http://localhost:8080 (verificar)</li>
                </ul>
            </div>
        </div>
    );
};

export default TestApp;