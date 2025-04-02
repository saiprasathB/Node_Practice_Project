import { useState, useEffect } from "react";
import { useSelector } from "react-redux";  
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import "./CSS/Admin.css";  

function AdminDashboard() {
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const navigate = useNavigate();

    // Get authentication state from Redux
    const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

    // Redirect non-admin users
    useEffect(() => {
        if (!isAuthenticated || !isAdmin) {
            alert("Access Denied! Admins only.");
            navigate("/login");
        }
    }, [isAuthenticated, isAdmin, navigate]);

    // Fetch unverified users
    useEffect(() => {
        const fetchUnverifiedUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/unverified");
                setUnverifiedUsers(response.data);
            } catch (error) {
                console.error("Error fetching unverified users", error);
            }
        };

        fetchUnverifiedUsers();
    }, []);

    // Handle Accept Button
    const handleAccept = async (userId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/accept/${userId}`);
            alert(response.data.message);
            setUnverifiedUsers(unverifiedUsers.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error accepting user", error);
            alert("Error verifying user");
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <h3>Unverified Users</h3>
            <ul>
                {unverifiedUsers.length > 0 ? (
                    unverifiedUsers.map(user => (
                        <li key={user._id}>
                            <span>{user.name} ({user.email})</span>
                            <button onClick={() => handleAccept(user._id)}>Accept</button>
                        </li>
                    ))
                ) : (
                    <p>No unverified users found.</p>
                )}
            </ul>
        </div>
    );
}

export default AdminDashboard;
