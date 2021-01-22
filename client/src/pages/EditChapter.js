import React from "react";
import TableOfContents from '../components/TableOfContents';
const EditChapter = () => {

    getText()

    commitChanges()

    return (
        <div>
            <div className="row">
                <div className="col-3"><TableOfContents /></div>
                <div className='col-9'>
                    <textarea id="chapter-text" name="chapter-text">{getText()}</textarea>
                </div>
                <button className="float-center" onClick={commitChanges()}>Commit</button>
            </div>
        </div>
    );
};

export default EditChapter;