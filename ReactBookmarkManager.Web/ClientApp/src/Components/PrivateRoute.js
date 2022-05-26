import React from 'react';
import LogIn from '../Pages/LogIn';
import { Route } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const PrivateRoute = ({ component, ...options }) => {
    const { user } = useUserContext();
    const finalComponent = !!user ? component : LogIn;
    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;