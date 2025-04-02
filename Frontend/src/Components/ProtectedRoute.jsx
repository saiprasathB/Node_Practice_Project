import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

   
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If the route requires a specific role and the user doesn't match, redirect to home
    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }

    // If the user is authorized, render the child component
    return children;
}

export default ProtectedRoute;
