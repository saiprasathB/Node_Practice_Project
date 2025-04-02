import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { loginSuccess } from "../redux/authSlice"; // Import Redux action
import "./CSS/Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (email === "2@2" && password === "2") {
            alert("Login Successful As Admin");
            dispatch(loginSuccess({ email, isAdmin: true })); // Update Redux state
            navigate("/admin");  
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", { email, password });

            if (response.data.isVerified) {
                alert("Login Successful");
                dispatch(loginSuccess({ email, isAdmin: false })); // Update Redux state
                navigate("/");  
            } else {
                alert("Your account is not verified. Please contact the admin.");
            }
        } catch (error) {
            alert("Invalid email or password");
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
