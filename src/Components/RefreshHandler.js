import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setidAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      setidAuthenticated(true);

      // Redirect to a protected route if the user is authenticated and not already on login or home page
      if (location.pathname === '/' || location.pathname === '/login') {
        navigate('/'); // Replace with the route you want authenticated users to go to
      }
    } else {
      // Optionally, if you want to redirect to login when no token is found
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [location, navigate, setidAuthenticated]);

  return null;
}

export default RefreshHandler;
