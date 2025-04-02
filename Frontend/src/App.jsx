import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Admin from "./Components/Admin";

function App() {
    const isAdmin = useSelector(state => state.auth.isAdmin); // Get admin status from Redux

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    
                  
                    <Route 
                        path="/admin" 
                        element={isAdmin ? <Admin /> : <Navigate to="/" />} 
                    />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
