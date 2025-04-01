import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import SignUp from "./Components/SignUp"
import Home from "./Components/Home";


function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}> </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
