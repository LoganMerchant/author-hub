import React, { useState } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { QUERY_GET_PROJECTS_BY_UPVOTE } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
  let publicProjects = [];

  const { loading, data } = useQuery(QUERY_GET_PROJECTS_BY_UPVOTE);

  if (!loading) {
    // console.log(data);
    publicProjects = data?.getProjectsByUpvote || [];
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark center">
        <h1 align="center">Top Projects</h1>
      </Jumbotron>
      <Container>
        <CardColumns>
          {publicProjects.map((topProjects) => {
            return (
              <Card key={topProjects._id} border="dark">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/readproject/${topProjects._id}`}>
                      {topProjects.title}
                    </Link>
                  </Card.Title>
                  <p className="small">Genre: {topProjects.genre}</p>
                  <Card.Text>{topProjects.summary}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Home;
