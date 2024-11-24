import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import session_cheker from './session-cheker';
import { ClipLoader } from "react-spinners";

const AdminProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false); // One-time redirect flag
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const session = await session_cheker();
      setUser(session || null);

      // Check if the user is an admin and hasn't been redirected yet
      if (session?.role === 'admin' && location.pathname === '/') {
        setRedirectToAdmin(true); // Trigger a one-time redirect
      }
      setLoading(false);
    };

    checkSession();
  }, [location.pathname]); // Re-run if the location changes

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  // Perform a one-time redirect for admin users to /admin after login
  if (redirectToAdmin) {
    setRedirectToAdmin(false); // Prevent further redirects
    return <Navigate to="/admin" replace />;
  }

  // Allow access to all routes after the first redirect
  return children;
};

export default AdminProtectedRoute;
