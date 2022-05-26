import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [topUrls, setTopUrls] = useState([]);

    useEffect(() => {
        const GetTopUrls = async () => {
            const { data } = await axios.get('/api/Bookmark/getTopUrls');
            setTopUrls(data);
        }
        GetTopUrls();
    }, [])

    const TableRow = (url, count, key) => {
        return (<tr key={key} >
            <td>{url}</td>
            <td>{count}</td>
        </tr>
        )
    }

    return (<div className="container">
        <h1>Welcome to the React Bookmark Application.</h1>
        <h3>Top 5 most bookmarked links</h3>
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th>Url</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {topUrls.map((x, k) => TableRow(x.url, x.count, k ))}
            </tbody>
        </table>
    </div>)
}
export default HomePage;