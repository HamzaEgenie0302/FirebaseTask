import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const a = getAuth();
    useEffect(() => {
      onAuthStateChanged(a, (user) => {
        setUser(user)
        setLoading(false);
      });
    }, []);
    if (loading) return <>Loading...</>;
    return user ? <Outlet /> : <Navigate to="/login" />;
  };
  