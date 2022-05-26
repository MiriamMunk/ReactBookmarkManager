import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookmarkTableRow from '../Components/bookmarkTableRow';
import { useUserContext } from '../UserContext';

const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/bookmark/getBookmarks');
            setBookmarks(data);
        }

        getBookmarks();
    }, [bookmarks])

    const onDeleteClick = async id => {
        await axios.post(`/api/bookmark/DeleteBookmark?id=${id}`);
    }

    const UpdateBookmarkTitle = async (title, id) => {
        await axios.post('/api/bookmark/updateBookmarkTitle', { title, id });
    }

    return (<><h3>Welcome back {user.firstName} {user.lastName}</h3>
        <Link to="/addBookmark" className="btn btn-primary btn-lg">Add Bookmark</Link>
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th>Title</th>
                    <th>Url</th>
                    <th>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {bookmarks.map((b, k) => < BookmarkTableRow
                    key={k}
                    bookmark={b}
                    onDeleteClick={() => onDeleteClick(b.id)}
                    onUpdateClick={() => UpdateBookmarkTitle(b.title, b.id)} />)}
            </tbody>
        </table></>)
}
export default MyBookmarks;