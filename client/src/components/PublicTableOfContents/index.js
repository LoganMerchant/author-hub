import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import { useStoreContext } from "../../utils/GlobalState";

const TableOfContents = () => {
    const [state] = useStoreContext();
    const { currentChapter, chapters } = state;

    return (

        <ListGroup>
            {/* Header of ToC */}
            <ListGroup.Item>
                <h3>Table of Contents</h3>
            </ListGroup.Item>

            {chapters &&
                chapters.filter(chapter => chapter.isPublic).map((chapter, index) => (
                    <div key={chapter._id}>
                        <Link to={`/readchapter/${chapter._id}`}>
                            {/* If the chapter is public */}
                            <ListGroup.Item action>
                                {/* Highlights the currentChapter */}
                                {currentChapter._id === chapter._id ? (
                                    <h4 style={{ color: "#EF5D58" }}>
                                        {index + 1}. {chapter.title}
                                    </h4>
                                ) : (
                                        <h4>
                                            {index + 1}. {chapter.title}
                                        </h4>
                                    )}
                                {!chapter.isPublic && <p>Unpublished</p>}
                            </ListGroup.Item>
                        </Link>
                    </div>
                ))}
        </ListGroup>
    );
};

export default TableOfContents;
