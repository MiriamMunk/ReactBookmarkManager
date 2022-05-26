import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

const Layout = (props) => {
    const { user } = useUserContext();
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className='navbar-brand'>
                            React Bookmark Manager
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!user && <>
                                    <li className="nav-item">
                                        <Link to='/signUp' className='nav-link text-light'>
                                            SignUp
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/logIn' className='nav-link text-light'>
                                            Log In
                                        </Link>
                                    </li></>
                                }
                                {!!user && <><li className="nav-item">
                                    <Link to='/logOut' className='nav-link text-light'>
                                        Log Out
                                    </Link>
                                </li>
                                    <li className="nav-item">
                                        <Link to='/addBookmark' className='nav-link text-light'>
                                            Add Bookmark
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/myBookmarks' className='nav-link text-light'>
                                            My Bookmarks
                                        </Link>
                                    </li></>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container" style={{ marginTop: 60 }}>
                {props.children}
            </div>

        </div>
    )
}

export default Layout;