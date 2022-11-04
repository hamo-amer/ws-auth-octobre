import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import LandPage from "./pages/LandPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { currentUser } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./pages/Posts";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<LandPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                    path="profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="posts"
                    element={
                        <PrivateRoute>
                            <Posts />
                        </PrivateRoute>
                    }
                />
            </Routes>
            <ToastContainer position="top-left" />
        </div>
    );
}

export default App;
