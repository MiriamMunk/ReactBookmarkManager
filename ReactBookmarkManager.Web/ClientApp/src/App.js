import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './Pages/Home';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import { UserContextComponent } from './UserContext';
import Logout from './Pages/logOut';
import AddBookMark from './Pages/AddBookmark';
import PrivateRoute from './Components/PrivateRoute';
import MyBookmarks from './Pages/MyBookmarks';

export default class App extends Component {
    render() {
        return (
            <UserContextComponent>
                <Layout>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/signUp' component={SignUp} />
                    <Route exact path='/logIn' component={LogIn} />
                    <Route exact path='/logOut' component={Logout} />
                    <PrivateRoute exact path='/addBookmark' component={AddBookMark} />
                    <PrivateRoute exact path='/myBookmarks' component={MyBookmarks} />
                </Layout>
            </UserContextComponent>
        );
    }
}