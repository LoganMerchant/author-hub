import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from "../../utils/GlobalState";
const ReadChapter = () => {
    const [state] = useStoreContext();
    const { chapters } = state;

    return (
        <div>
            {chapters.length > 0 &&
                <div>
                    <h3 className="header">Public Chapters For Your Enjoyment</h3>
                    <ul>
                        {chapters.map(chapter => (
                            <li>
                                <Link key={chapter._id} to={`/readchapter/${chapter._id}`}>{chapter.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            {chapters.length === 0 &&
                <div><h3>This project currently doesn't have any public chapters...</h3></div>}
        </div>
    );
}

export default ReadChapter;