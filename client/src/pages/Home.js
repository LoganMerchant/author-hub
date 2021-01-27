import React from "react";
import TitleCard from "../components/TitleCard";

const Home = () => {
    return (
        <Container>
            <h2>Most Popular Reads</h2>
            <div className="titleCard">
                <TitleCard />
            </div>
        </Container>
    );
};

export default Home;