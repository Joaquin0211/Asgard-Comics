import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import OwnerDashboard from './views/OwnerDashboard';
import WriterDashboard from './views/WriterDashboard';
import UserDashboard from './views/UserDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/writer-dashboard" element={<WriterDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
