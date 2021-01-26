import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Container, 
    Col,
    Row,
    Button,
    Card,
    CardColumns,
} from "react-bootstrap";

import {useStoreContext } from "../../utils/GlobalState";

import { 
    ADD_USER,
    ADD_PROJECT,

} from "../../utils/actions";
//change the name of the folder, the function, and the export value.

const TitleCard = () => {

    const [state, dispatch] = useStoreContext();
    const { addProject, projects } = state;

    const handleOnClick = (title) => {
        dispatch({
            type: ADD_PROJECT,
            addProject: projects,
        });
    };
    return (
        <Container id="titleContainer">
            <Card id="titleCard">
                <Row>
                    <Col sm={sm} md={4} lg={4}>
                        <img src={cover} alt="Book Cover" />
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <h3
                            action
                            key={projects._id}
                            onClick={() => handleOnClick(title)}
                            >
                        </h3>
                        <h5>SUMMARY</h5>
                        <p>{summary}</p>
                        <p id="tileCollaborators">{collaborators}</p>
                    </Col>
                </Row>
                {projects.map((title) => title)}
                <Row>
                <Col sm={sm} md={4} lg={4}>
                        <img src={cover} alt="Book Cover" />
                    </Col>
                    <Col sm={12} md={4} lg={4}>
                        <h3>{title}</h3>
                        <h5>SUMMARY</h5>
                        <p>{summary}</p>
                        <p id="tileCollaborators">{collaborators}</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default TitleCard;