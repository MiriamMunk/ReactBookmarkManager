import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddBookMark = () => {

    const history = useHistory();
    const [FormData, SetFormData] = useState({ title: '', url: '' });

    const onTextChange = e => {
        const copy = { ...FormData };
        copy[e.target.name] = e.target.value;
        SetFormData(copy);
    }

    const onSubmitClick = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addBookmark', FormData);
        history.push('/myBookmarks');
    }

    return (<div className="col-md-6 offset-md-3 card card-body bg-light">
        <h3>Add Bookmark</h3>
        <form onSubmit={onSubmitClick}>
            <input type="text" name="title" placeholder="Title" className="form-control" onChange={onTextChange} />
            <br />
            <input type="text" name="url" placeholder="Url" className="form-control" onChange={onTextChange} />
            <br />
            <button className="btn btn-primary">Add</button>
        </form>
    </div>)
}
export default AddBookMark;