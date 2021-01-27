import React from "react";
import TitleCard from "../components/TitleCard";

const Home = () => {
    return (
        <Container>
            <h2>MOST POPULAR READS</h2>
            <div className="titleCard">
                <TitleCard />
            </div>
        </Container>
    );
};

export default Home;