import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUserData, setIsAuthenticated, setUserData } from './Features/userDetails.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminRoutes = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://spark-ed-tech.onrender.com/api/admin/admin-auth');
                if (response.status === 200) {
                    dispatch(setUserData(response.data.data));
                    dispatch(setIsAuthenticated(true));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                dispatch(setIsAuthenticated(false));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);



    return isLoading ? <h1>Loading....</h1> : isAuthenticated ? <Outlet /> : <Navigate to='/login' />


};

export default AdminRoutes;
