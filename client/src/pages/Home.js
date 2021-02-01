import React from "react";
import { Jumbotron, Container, Card, CardColumns } from "react-bootstrap";

import { Link } from "react-router-dom";
import { QUERY_GET_PROJECTS_BY_UPVOTE } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";

const Home = () => {
  let publicProjects = [];

  const { loading, data } = useQuery(QUERY_GET_PROJECTS_BY_UPVOTE, {
    fetchPolicy: "network-only",
  });

  if (!loading) {
    publicProjects = data?.getProjectsByUpvote || [];
  }

  return (
    <>
      <Jumbotron fluid className="homeHero">
        <h1 align="center" className="homeHeader">
          Share Your Stories.
        </h1>
      </Jumbotron>
      <Container>
        <h2 className="h2Header">
          Discover the most popular writing projects on AuthorHub!
        </h2>
        <CardColumns>
          {publicProjects.map((topProjects) => {
            return (
              <Card key={topProjects._id} className="homeCard">
                <Card.Body>
                  <Card.Title className="homeTitle">
                    <Link
                      className="homeTitle"
                      to={`/readproject/${topProjects._id}`}
                    >
                      {topProjects.title} by {topProjects.authorName}
                    </Link>
                  </Card.Title>
                  <p className="homeGenre">Genre: {topProjects.genre}</p>
                  <Card.Text className="homeSummary">
                    {topProjects.summary}
                  </Card.Text>
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
