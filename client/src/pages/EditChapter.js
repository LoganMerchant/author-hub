import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CHAPTERS, ADD_COMMIT } from "../utils/actions";
import { QUERY_CHAPTER } from "../utils/queries";
import TableOfContents from '../components/TableOfContents';
import CommitList from '../components/CommitList';
const EditChapter = () => {
    const [state, dispatch] = useStoreContext;
    const { id } = useParams();
    const [currentChapter, setCurrentChapter] = useState({});
    const { loading, data } = useQuery(QUERY_CHAPTER);
    const { project, chapter } = state;
    useEffect(() => {
        if (project.chapter.length) {
            setCurrentChapter(chapter.find(chapter => chapter._id === id));
        }
        else if (data) {
            dispatch({
                type: UPDATE_CHAPTERS,
                chapters: data.chapters
            })
            data.chapters.forEach((chapter) => {
                idbPromise('chapters', 'put', chapter)
            });
        }
        else if (!loading) {
            idbPromise('chapters', 'get').then((indexedChapters) => {
                dispatch({
                    type: UPDATE_CHAPTERS,
                    chapters: indexedChapters
                })
            })
        }
    }, [chapter, data, loading, dispatch, id]);

    const commitChanges = () => {
        dispatch({
            type: ADD_COMMIT,
            chapter: { ...currentChapter, commitText, commitType, username }// after the , would be the commit info, as I do not have the modal, I have no idea how to handle this...
        })
        idbPromise('chapter', 'put', { ...currentChapter, chapterText, commitText, commitType, username }) //again guesing here.
    }

    return (
        <div>
            <div className="row">
                <div className="col-3"><TableOfContents /></div>
                <div className='col-9'>
                    <textarea id="chapter-text" name="chapter-text">{currentChapter.chapterText}</textarea>
                </div>
            </div>
            <div id="button-container">
                <button className="float-center" onClick={commitChanges()}>Commit</button>
            </div>
            <div id="commit-container">
                {currentChapter.commitCount > 0 && <CommitList commits={chapter.commits} />}
            </div>
        </div>
    );
};

export default EditChapter;