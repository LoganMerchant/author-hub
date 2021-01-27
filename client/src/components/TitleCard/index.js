import React, { useState } from 'react';
import {
    Container, 
    Col,
    Row,
    Button,
    Card,
} from "react-bootstrap";

import { QUERY_GET_PROJECTS_BY_UPVOTE } from "../../utils/queries";
import { useQuery } from '@apollo/react-hooks';

const TitleCard = () => {

    //create state for holding returned book info for popular projects
    const [popularBook, setBooks] = useState([]);

    const { loading, data } = useQuery(QUERY_GET_PROJECTS_BY_UPVOTE);
    
    // function filterBooks() {
    //     if (!popularBook) {
    //         return book;
    //     }
    // }

    return (
        <Container id="titleContainer">
            <Card id="titleCard">
                <Row>
                    <Col sm={12} md={4} lg={4}>
                        <img src={cover} alt="Book Cover" />
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <h3
                            action
                            key={book._id}
                            onClick={() => handleOnClick(book)}
                            >
                        </h3>
                        <h4>by {book.authorName}</h4>
                        <h5>GENRE: {book.genre}</h5>
                        <h6>SUMMARY</h6>
                        <p>{book.summary}</p>
                        <Button className="btn">
                            READ
                        </Button>
                        <p id="titleCollaborators">COLLABORATORS
                        {book.collaborators}</p>
                    </Col>
                </Row>
                {popularBooks.map((book) => book)}
                
            </Card>
        </Container>
    );
}

export default TitleCard;