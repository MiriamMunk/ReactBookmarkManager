import React, { useState } from 'react';

const BookmarkTableRow = ({ bookmark, onDeleteClick, onUpdateClick }) => {

    const { title, url } = bookmark;
    const [edit, setEdit] = useState(false);
    const [updateTitle, setUpdateTitle] = useState(title);

    const cancel = () => {
        setEdit(false);
        setUpdateTitle(title);
    }

    const UpdateClick = () => {
        bookmark.title = updateTitle;
        onUpdateClick();
        setEdit(false);
    }

    return <tr>
        <td>{edit ? <input className="form-control" type="text" value={updateTitle} onChange={e => setUpdateTitle(e.target.value)} /> : title}</td>
        <td><a target="_blank" href={url}>{url}</a></td>
        <td>
            {edit && <><button className="btn btn-warning" onClick={UpdateClick}>Update</button>
                <button className="btn btn-info" onClick={cancel}>Cancel</button></>}

            {!edit && <button className="btn btn-success" onClick={() => setEdit(true)}>Edit</button>}
            <button className="btn btn-danger" onClick={onDeleteClick} > Delete</button>
        </td>
    </tr>
}
export default BookmarkTableRow;