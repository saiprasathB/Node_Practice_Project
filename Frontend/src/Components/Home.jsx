import { Link } from "react-router-dom";
import "./CSS/Home.css";

function HomePage() {
    return (
        <div className="home-container">
            <nav className="navbar">
                <h1 className="logo">Welcome to Our Platform</h1>
                <div className="nav-buttons">
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/signup" className="nav-button">Sign Up</Link>
                </div>
            </nav>
            <main className="intro-section">
                <h2>Summa Heading</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae, nostrum sint dolorem repellat odio eum cumque, molestias libero, necessitatibus omnis nulla aperiam aliquid amet aspernatur perspiciatis reprehenderit enim pariatur expedita?</p>
            </main>
        </div>
    );
}

export default HomePage;
