import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, setIsAuthenticated, setUserData } from './Features/userDetails.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Components/Loader.jsx';

const SecuredRoutes = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user-data`, { withCredentials: true });
        if (response.status === 200) {
          dispatch(setUserData(response.data.data));
          dispatch(setIsAuthenticated(true));
        } else {
          dispatch(setIsAuthenticated(false)); // Handle unexpected status
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch(setIsAuthenticated(false));
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    if (!isAuthenticated) { // Only fetch if not authenticated
      fetchData();
    } else {
      setIsLoading(false); // If already authenticated, set loading to false
    }
  }, [dispatch, isAuthenticated]); // Added isAuthenticated to the dependency array

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default SecuredRoutes;
